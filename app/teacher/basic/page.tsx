"use client";
// This page was moved from /teacher/grading to /teacher/basic.
// Basic grading prototype: Set OPENAI_API_KEY in .env.local, then use this page to submit the grading form.

import { useEffect, useMemo, useState } from "react";
import type { GradeRequest, GradeResponse, ApiError } from "@/types/grading";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const LANGUAGE_OPTIONS = ["Python", "JavaScript", "Java", "C++"] as const;

// Student code can be empty; server/prompt will handle missing-code behavior.

const Schema = z.object({
    instructions: z.string().trim().min(1, "This field is required."),
    rubric: z.string().trim().min(1, "This field is required."),
    // Optional per requirements; allow empty string or undefined.
    studentCode: z.string().optional(),
    language: z.enum(LANGUAGE_OPTIONS),
    dataInput: z.string(),
});

type FormValues = z.input<typeof Schema>;

const STORAGE_KEY = "gradingForm.v1";

export default function BasicGradingPage() {
    const persistedDefaults: FormValues | undefined = useMemo(() => {
        if (typeof window === "undefined") return undefined;
        try {
            const raw = window.localStorage.getItem(STORAGE_KEY);
            if (!raw) return undefined;
            const parsed = JSON.parse(raw) as Partial<FormValues>;
            return {
                instructions: parsed.instructions ?? "",
                rubric: parsed.rubric ?? "",
                studentCode: parsed.studentCode ?? "",
                language:
                    (parsed.language as FormValues["language"]) ?? "Python",
                dataInput: parsed.dataInput ?? "",
            };
        } catch {
            return undefined;
        }
    }, []);

    const form = useForm<FormValues>({
        resolver: zodResolver(Schema),
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: persistedDefaults ?? {
            instructions: "",
            rubric: "",
            studentCode: "",
            language: "Python",
            dataInput: "",
        },
    });

    const { watch, formState, handleSubmit, reset, control } = form;
    const { isValid, isSubmitting } = formState;
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<GradeResponse | null>(null);

    const watched = watch();
    useEffect(() => {
        try {
            const toSave: FormValues = {
                instructions: watched.instructions ?? "",
                rubric: watched.rubric ?? "",
                studentCode: watched.studentCode ?? "",
                language:
                    (watched.language as FormValues["language"]) ?? "Python",
                dataInput: watched.dataInput ?? "",
            };
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
        } catch {}
    }, [
        watched.instructions,
        watched.rubric,
        watched.studentCode,
        watched.language,
        watched.dataInput,
    ]);

    const onSubmit = async (values: FormValues) => {
        setError(null);
        setResult(null);
        setLoading(true);
        const body: GradeRequest = {
            language: values.language,
            instructions: values.instructions,
            dataInput: values.dataInput || "",
            rubric: values.rubric,
            studentCode: values.studentCode || "",
        };
        try {
            const res = await fetch("/api/grade", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            if (!res.ok) {
                const err = (await res
                    .json()
                    .catch(() => null)) as ApiError | null;
                setError(
                    err?.error ||
                        `Request failed with status ${res.status}. Please try again.`
                );
                return;
            }
            const data = (await res.json()) as GradeResponse;
            setResult(data);
        } catch {
            setError("Network error. Please check your connection and retry.");
        } finally {
            setLoading(false);
        }
    };

    const onInvalid = () => {
        setError(null);
    };

    const clearAll = () => {
        reset({
            instructions: "",
            rubric: "",
            studentCode: "",
            language: "Python",
            dataInput: "",
        });
        try {
            window.localStorage.removeItem(STORAGE_KEY);
        } catch {}
        setError(null);
        setResult(null);
    };

    return (
        <main>
            <div className="max-w-4xl w-full mx-auto">
                <header className="mb-6">
                    <h1 className="mb-2">Basic Grading</h1>
                    <p className="text-muted-foreground">
                        Prototype grading form. Fill details and submit to grade
                        with OpenAI.
                    </p>
                </header>

                {error && (
                    <div
                        role="alert"
                        className="mb-4 rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                    >
                        {error}
                    </div>
                )}

                <Form {...form}>
                    <form
                        onSubmit={handleSubmit(onSubmit, onInvalid)}
                        noValidate
                        className="grid gap-5"
                    >
                        <FormField
                            control={control}
                            name="instructions"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Instructions</FormLabel>
                                    <FormDescription>
                                        Required. Guidance for the grader.
                                    </FormDescription>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Describe the task and what to focus on..."
                                            rows={5}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="rubric"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Rubric</FormLabel>
                                    <FormDescription>
                                        Required. Criteria and scoring guidance.
                                    </FormDescription>
                                    <FormControl>
                                        <Textarea
                                            placeholder="List the rubric criteria, point values, and expectations..."
                                            rows={6}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="studentCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Student Code</FormLabel>
                                    <FormDescription>
                                        Optional. Paste the student code (can be
                                        empty).
                                    </FormDescription>
                                    <FormControl>
                                        <Textarea
                                            placeholder={
                                                "Paste the student's code here..."
                                            }
                                            rows={10}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="language"
                            render={({ field }) => (
                                <FormItem className="grid gap-1">
                                    <FormLabel>Language</FormLabel>
                                    <FormDescription>
                                        Optional. Defaults to Python.
                                    </FormDescription>
                                    <FormControl>
                                        <Select
                                            value={field.value ?? "Python"}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger aria-label="Language">
                                                <SelectValue placeholder="Select a language" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {LANGUAGE_OPTIONS.map((opt) => (
                                                    <SelectItem
                                                        key={opt}
                                                        value={opt}
                                                    >
                                                        {opt}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="dataInput"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Data Input</FormLabel>
                                    <FormDescription>
                                        Optional. Provide input data or test
                                        cases.
                                    </FormDescription>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Optional input data (e.g., JSON, CSV, or plain text)"
                                            rows={5}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex items-center gap-3 pt-2">
                            <Button
                                type="submit"
                                disabled={!isValid || isSubmitting || loading}
                                aria-disabled={
                                    !isValid || isSubmitting || loading
                                }
                            >
                                {loading ? "Grading…" : "Grade"}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={clearAll}
                            >
                                Clear
                            </Button>
                        </div>
                    </form>
                </Form>

                {result && (
                    <section className="mt-8 space-y-4">
                        <div className="rounded-md border p-4">
                            <div className="flex items-center justify-between gap-3 flex-wrap">
                                <div className="font-medium">Total</div>
                                <div className="text-sm text-muted-foreground">
                                    {result.total.earned} / {result.total.max} (
                                    {Math.round(result.total.percentage)}%)
                                </div>
                            </div>
                            <p className="mt-2 text-sm">{result.message}</p>
                        </div>

                        {Array.isArray(result.sections) &&
                            result.sections.length > 0 && (
                                <div className="grid gap-3">
                                    {result.sections.map((s) => (
                                        <div
                                            key={s.id}
                                            className="rounded-md border p-4"
                                        >
                                            <div className="flex items-center justify-between gap-3 flex-wrap">
                                                <div className="font-semibold">
                                                    {s.title}
                                                </div>
                                                <div className="text-sm text-muted-foreground">
                                                    {s.score} / {s.maxPoints}
                                                </div>
                                            </div>
                                            <p className="mt-2 text-sm whitespace-pre-wrap">
                                                {s.comments}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}

                        <div className="rounded-md border p-4">
                            <h2 className="font-semibold">Summary</h2>
                            <p className="mt-2 text-sm whitespace-pre-wrap">
                                {result.summary}
                            </p>
                        </div>

                        {result.suggestions &&
                            result.suggestions.length > 0 && (
                                <div className="rounded-md border p-4">
                                    <h3 className="font-semibold">
                                        Suggestions
                                    </h3>
                                    <ul className="mt-2 list-disc pl-6 text-sm space-y-1">
                                        {result.suggestions.map((sug, idx) => (
                                            <li key={idx}>{sug}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                        <div className="rounded-md border p-4">
                            <div className="flex items-center justify-between gap-3 flex-wrap">
                                <h3 className="font-semibold">Raw JSON</h3>
                                <div className="flex gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={async () => {
                                            try {
                                                await navigator.clipboard.writeText(
                                                    JSON.stringify(
                                                        result,
                                                        null,
                                                        2
                                                    )
                                                );
                                                setError(null);
                                            } catch {
                                                setError(
                                                    "Could not copy to clipboard."
                                                );
                                            }
                                        }}
                                    >
                                        Copy JSON
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            try {
                                                const blob = new Blob(
                                                    [
                                                        JSON.stringify(
                                                            result,
                                                            null,
                                                            2
                                                        ),
                                                    ],
                                                    { type: "application/json" }
                                                );
                                                const url =
                                                    URL.createObjectURL(blob);
                                                const a =
                                                    document.createElement("a");
                                                a.href = url;
                                                a.download =
                                                    "grade-result.json";
                                                document.body.appendChild(a);
                                                a.click();
                                                a.remove();
                                                URL.revokeObjectURL(url);
                                            } catch {
                                                setError(
                                                    "Could not download JSON file."
                                                );
                                            }
                                        }}
                                    >
                                        Download JSON
                                    </Button>
                                </div>
                            </div>
                            <details className="mt-3">
                                <summary className="cursor-pointer text-sm text-muted-foreground">
                                    Toggle JSON view
                                </summary>
                                <pre className="mt-3 max-h-80 overflow-auto rounded bg-muted p-3 text-xs">
                                    {JSON.stringify(result, null, 2)}
                                </pre>
                            </details>
                        </div>
                    </section>
                )}
            </div>
        </main>
    );
}
