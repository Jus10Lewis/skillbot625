import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Teacher Tools — Coming soon",
    description:
        "A simple placeholder for Teacher Tools while we build out grading features.",
};

export default function TeacherDashboardPlaceholder() {
    return (
        <main className="mx-auto max-w-5xl px-4 py-16">
            <h1 className="text-3xl font-bold mb-4">Teacher Tools</h1>
            <p className="text-muted-foreground mb-8 max-w-2xl">
                We’re building tools for assignments, auto-grading, and
                analytics. Core grading experiences are rolling out below.
            </p>
            <div className="flex gap-3 flex-wrap">
                <Link
                    href="/teacher/basic"
                    className="btn-primary inline-block"
                >
                    Go to Basic Grading
                </Link>
                <Link
                    href="/teacher/grading/dashboard"
                    className="btn-primary inline-block"
                >
                    Future Better Grading
                </Link>
            </div>
        </main>
    );
}
