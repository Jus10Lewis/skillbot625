import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

import type { GradeRequest, GradeResponse, ApiError } from "@/types/grading";

export const runtime = "nodejs";

// Basic input size limits to reduce token bloat
const LIMITS = {
    textLarge: 20_000, // instructions, rubric, dataInput
    code: 200_000, // studentCode
};

function sanitize(input: unknown, max: number): string | undefined {
    if (typeof input !== "string") return undefined;
    const trimmed = input.trim();
    if (trimmed.length > max) {
        return trimmed.slice(0, max);
    }
    return trimmed;
}

function badRequest(error: string, details?: unknown) {
    const body: ApiError = { error, ...(details ? { details } : {}) };
    return NextResponse.json(body, { status: 400 });
}

function serverError(status: number, error: string, details?: unknown) {
    const body: ApiError = { error, ...(details ? { details } : {}) };
    return NextResponse.json(body, { status });
}

async function callOpenAIJSON(system: string, userPayload: GradeRequest) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        throw new Error("Missing OPENAI_API_KEY in environment");
    }

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            temperature: 0.2,
            response_format: { type: "json_object" },
            messages: [
                { role: "system", content: system },
                { role: "user", content: JSON.stringify(userPayload) },
            ],
            max_tokens: 1200,
        }),
    });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        const err = new Error(`OpenAI error ${res.status}: ${text}`);
        // Attach status for upstream handling
        // @ts-expect-error augment
        err.status = res.status;
        throw err;
    }
    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content;
    if (!content || typeof content !== "string") {
        throw new Error("Invalid response from OpenAI: missing content");
    }
    let parsed: GradeResponse;
    try {
        parsed = JSON.parse(content);
    } catch {
        throw new Error("Invalid JSON from OpenAI");
    }
    return parsed;
}

export async function POST(req: NextRequest) {
    let payload: Partial<GradeRequest>;
    try {
        payload = (await req.json()) as Partial<GradeRequest>;
    } catch {
        return badRequest("Invalid JSON body");
    }

    const language = sanitize(payload.language, 100) || "";
    const instructions = sanitize(payload.instructions, LIMITS.textLarge) || "";
    const rubric = sanitize(payload.rubric, LIMITS.textLarge) || "";
    const dataInput = sanitize(payload.dataInput ?? "", LIMITS.textLarge) ?? "";
    const studentCode = sanitize(payload.studentCode ?? "", LIMITS.code) ?? "";

    if (!language || !instructions || !rubric) {
        return badRequest(
            "Missing required fields: language, instructions, and rubric are required."
        );
    }

    // Read system prompt from app/prompt.md at request time
    const promptPath = path.join(process.cwd(), "app", "prompt.md");
    let systemPrompt = "";
    try {
        const full = fs.readFileSync(promptPath, "utf8");
        const marker = "# Grading System Prompt";
        const idx = full.indexOf(marker);
        systemPrompt = idx >= 0 ? full.slice(idx) : full;
    } catch (e) {
        return serverError(500, "Failed to load system prompt", `${e}`);
    }

    const userPayload: GradeRequest = {
        language,
        instructions,
        dataInput,
        rubric,
        studentCode,
    };

    try {
        const result = await callOpenAIJSON(systemPrompt, userPayload);
        // Basic shape guard (minimal)
        if (
            typeof result !== "object" ||
            result === null ||
            !("sections" in result) ||
            !("total" in result)
        ) {
            return serverError(502, "Upstream returned invalid shape");
        }
        return NextResponse.json(result satisfies GradeResponse);
    } catch (err: unknown) {
        const anyErr = err as { status?: number; message?: string } | undefined;
        const status = typeof anyErr?.status === "number" ? anyErr.status : 500;
        if (status === 429) {
            return serverError(
                429,
                "Rate limited by OpenAI. Please retry shortly."
            );
        }
        return serverError(
            status,
            "Failed to grade with OpenAI",
            anyErr?.message || String(err)
        );
    }
}
