import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Teacher Dashboard — Coming soon",
    description:
        "A simple placeholder for the Teacher Dashboard. Start with AI Tutors while we build this out.",
};

export default function TeacherDashboardPlaceholder() {
    return (
        <main className="mx-auto max-w-5xl px-4 py-16">
            <h1 className="text-3xl font-bold mb-4">Teacher Dashboard</h1>
            <p className="text-muted-foreground mb-8 max-w-2xl">
                We’re building a powerful dashboard for assignments,
                auto-grading, and analytics. In the meantime, you can start with
                AI Tutors to explore our learning experience.
            </p>
            <div className="flex gap-3">
                <Link href="/ai-tutors" className="btn-primary inline-block">
                    Start with AI Tutors
                </Link>
                <Link
                    href="/teacher/grading"
                    className="btn-primary inline-block"
                >
                    Go to Grading
                </Link>
            </div>
        </main>
    );
}
