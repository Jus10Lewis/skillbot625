import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "AI Teaching Assistant — Grade faster, teach smarter",
    description:
        "Auto-grader and AI tutors to free your time and boost student outcomes.",
    openGraph: {
        title: "AI Teaching Assistant",
        description:
            "Auto-grader and AI tutors to free your time and boost student outcomes.",
        url: "https://teach.onl/",
        siteName: "Skillbot",
        images: [{ url: "/readme/thumbnail.png", width: 1200, height: 630 }],
        locale: "en_US",
        type: "website",
    },
    twitter: { card: "summary_large_image" },
    icons: { icon: "/icon.png" },
};

export default function LandingPage() {
    return (
        <main>
            {/* Hero */}
            <section className="mx-auto max-w-6xl px-4 pt-16 pb-12">
                <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
                    <div>
                        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                            AI Teaching Assistant that grades faster and teaches
                            smarter
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground max-w-prose">
                            Auto-grader and AI tutors to free your time and
                            boost student outcomes.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link href="/ai-tutors" className="btn-primary">
                                Try AI Tutors
                            </Link>
                            <Link
                                href="/teacher-dashboard"
                                className="btn-outline"
                            >
                                Teacher Dashboard
                            </Link>
                        </div>
                    </div>
                    <div className="relative">
                        {/* Placeholder illustration */}
                        <div className="aspect-[16/10] w-full rounded-lg border bg-gradient-to-br from-primary/10 to-transparent" />
                    </div>
                </div>
            </section>

            {/* Social Proof */}
            <section className="mx-auto max-w-6xl px-4 py-8">
                <p className="text-center text-sm uppercase tracking-wider text-muted-foreground">
                    Trusted by educators
                </p>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-6 opacity-70">
                    <div className="h-8 bg-muted rounded" />
                    <div className="h-8 bg-muted rounded" />
                    <div className="h-8 bg-muted rounded" />
                    <div className="h-8 bg-muted rounded" />
                </div>
            </section>

            {/* Features */}
            <section className="mx-auto max-w-6xl px-4 py-12">
                <div className="grid gap-6 md:grid-cols-3">
                    <div className="rounded-lg border p-6">
                        <h3 className="font-semibold">Auto-Grader</h3>
                        <p className="mt-2 text-muted-foreground">
                            Instant, consistent feedback across assignments.
                        </p>
                    </div>
                    <div className="rounded-lg border p-6">
                        <h3 className="font-semibold">AI Tutors</h3>
                        <p className="mt-2 text-muted-foreground">
                            Personalized guidance for every learner.
                        </p>
                    </div>
                    <div className="rounded-lg border p-6">
                        <h3 className="font-semibold">Analytics</h3>
                        <p className="mt-2 text-muted-foreground">
                            Track progress and uncover learning gaps.
                        </p>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="mx-auto max-w-6xl px-4 py-12">
                <ol className="grid gap-6 md:grid-cols-3">
                    <li className="rounded-lg border p-6">
                        <h4 className="font-medium">1. Create assignment</h4>
                    </li>
                    <li className="rounded-lg border p-6">
                        <h4 className="font-medium">2. Students submit</h4>
                    </li>
                    <li className="rounded-lg border p-6">
                        <h4 className="font-medium">
                            3. Auto-grade + insights
                        </h4>
                    </li>
                </ol>
            </section>

            {/* Pricing Preview */}
            <section className="mx-auto max-w-6xl px-4 py-12">
                <div className="rounded-lg border p-8 text-center">
                    <h3 className="text-xl font-semibold">
                        Free trial available. Monthly plans when you’re ready.
                    </h3>
                    <Link
                        href="/ai-tutors"
                        className="btn-primary mt-6 inline-block"
                    >
                        Start free
                    </Link>
                </div>
            </section>

            {/* Testimonials */}
            <section className="mx-auto max-w-6xl px-4 py-12">
                <div className="grid gap-6 md:grid-cols-3">
                    <blockquote className="rounded-lg border p-6 text-sm text-muted-foreground">
                        “Saved me hours every week.”
                    </blockquote>
                    <blockquote className="rounded-lg border p-6 text-sm text-muted-foreground">
                        “Students love the instant feedback.”
                    </blockquote>
                    <blockquote className="rounded-lg border p-6 text-sm text-muted-foreground">
                        “The analytics made trends obvious.”
                    </blockquote>
                </div>
            </section>

            {/* Final CTA */}
            <section className="mx-auto max-w-6xl px-4 py-16 text-center">
                <h3 className="text-2xl font-bold">Start with AI Tutors</h3>
                <Link
                    href="/ai-tutors"
                    className="btn-primary mt-6 inline-block"
                >
                    Try AI Tutors
                </Link>
            </section>

            {/* Footer */}
            <footer className="border-t">
                <div className="mx-auto max-w-6xl px-4 py-8 grid gap-4 sm:flex sm:items-center sm:justify-between">
                    <nav className="flex gap-4 text-sm text-muted-foreground">
                        <Link href="/">Home</Link>
                        <Link href="/ai-tutors">AI Tutors</Link>
                        <Link href="/teacher-dashboard">Teacher Dashboard</Link>
                        <Link href="#">Privacy</Link>
                        <Link href="#">Terms</Link>
                    </nav>
                    <p className="text-xs text-muted-foreground">
                        © {new Date().getFullYear()} Skillbot
                    </p>
                </div>
            </footer>
        </main>
    );
}
