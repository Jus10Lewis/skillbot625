"use client";

import { useEffect, useMemo, useState } from "react";
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

const studentCodeMissingMsg =
    "You have not submitted the proper code. If you're ready, please submit the student's code, and I'll start the grading process according to the provided rubric.";

const Schema = z.object({
    instructions: z.string().trim().min(1, "This field is required."),
    rubric: z.string().trim().min(1, "This field is required."),
    studentCode: z.string().trim().min(1, studentCodeMissingMsg),
    language: z.enum(LANGUAGE_OPTIONS),
    dataInput: z.string(),
});

type FormValues = z.infer<typeof Schema>;

const STORAGE_KEY = "gradingForm.v1";

export default function GradingPage() {
    const persistedDefaults: FormValues | undefined = useMemo(() => {
        if (typeof window === "undefined") return undefined;
        try {
            const raw = window.localStorage.getItem(STORAGE_KEY);
            if (!raw) return undefined;
            const parsed = JSON.parse(raw) as Partial<FormValues>;
            // Validate shape loosely; fall back on undefined to use defaults below.
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
    const [notice, setNotice] = useState<string | null>(null);

    // Persist to localStorage when values change
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
        } catch {
            // ignore persistence errors
        }
    }, [
        watched.instructions,
        watched.rubric,
        watched.studentCode,
        watched.language,
        watched.dataInput,
    ]);

    const onSubmit = () => {
        // Client-side only: no network. Show notice.
        setNotice("Ready to grade — backend not implemented yet.");
    };

    const onInvalid = () => {
        // If studentCode invalid, ensure our exact message is visible (it already is via schema)
        setNotice(null);
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
        } catch {
            // ignore
        }
        setNotice(null);
    };

    return (
        <main>
            <div className="max-w-4xl w-full mx-auto">
                <header className="mb-6">
                    <h1 className="mb-2">Grading</h1>
                    <p className="text-muted-foreground">
                        Fill in the details below. This page validates inputs
                        only and makes no network requests.
                    </p>
                </header>

                {notice && (
                    <div
                        role="status"
                        className="mb-4 rounded-md border border-border bg-secondary px-4 py-3 text-sm"
                    >
                        {notice}
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
                                        Required. Paste the student code.
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
                                    {/* Ensure exact message for empty/whitespace via schema */}
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
                                disabled={!isValid || isSubmitting}
                                aria-disabled={!isValid || isSubmitting}
                            >
                                Grade
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
            </div>
        </main>
    );
}
