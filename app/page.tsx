import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
    title: "AI-Powered Programming Assignment Grader — Save Hours Every Week",
    description:
        "Automated grading system that evaluates student code against custom rubrics. Get detailed feedback, consistent scoring, and comprehensive analytics in seconds.",
    openGraph: {
        title: "AI Programming Assignment Grader",
        description:
            "Grade programming assignments in seconds with AI-powered evaluation and detailed rubric-based feedback.",
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
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <div className="mx-auto max-w-6xl px-4 pt-20 pb-16">
                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700 mb-6">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                AI-Powered Grading
                            </div>
                            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-tight">
                                Grade 50 assignments in{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                    5 minutes
                                </span>
                            </h1>
                            <p className="mt-6 text-xl text-gray-600 max-w-prose leading-relaxed">
                                Automated programming assignment grader that
                                evaluates student code against your custom
                                rubrics. Get detailed, consistent feedback in
                                seconds instead of hours.
                            </p>
                            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/teacher/grading/dashboard"
                                    className="btn-primary text-lg px-8 py-4 justify-center"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                                    </svg>
                                    Start Grading Now
                                </Link>
                                <Link
                                    href="#how-it-works"
                                    className="btn-secondary text-lg px-8 py-4 justify-center"
                                >
                                    See How It Works
                                </Link>
                            </div>
                            <p className="mt-6 text-sm text-gray-500">
                                ⚡ No credit card required • 🔒 FERPA compliant
                                • ⏱️ Setup in 2 minutes
                            </p>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl transform rotate-3"></div>
                            <Image
                                src="/images/class.png"
                                alt="AI grading dashboard showing student submissions and scores"
                                width={800}
                                height={500}
                                className="relative aspect-[16/10] w-full rounded-2xl object-cover shadow-2xl border-4 border-white transform rotate-3"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="border-y bg-gray-50">
                <div className="mx-auto max-w-6xl px-4 py-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold text-blue-600">
                                10x
                            </div>
                            <div className="mt-2 text-sm text-gray-600">
                                Faster Grading
                            </div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-purple-600">
                                100%
                            </div>
                            <div className="mt-2 text-sm text-gray-600">
                                Consistent
                            </div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-green-600">
                                10hrs
                            </div>
                            <div className="mt-2 text-sm text-gray-600">
                                Saved Weekly
                            </div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-orange-600">
                                24/7
                            </div>
                            <div className="mt-2 text-sm text-gray-600">
                                Availability
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="mx-auto max-w-6xl px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        Everything you need to grade smarter
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Built specifically for computer science educators who
                        need powerful, reliable grading automation
                    </p>
                </div>
                <div className="grid gap-8 md:grid-cols-3">
                    <div className="group rounded-xl border-2 border-gray-200 p-8 hover:border-blue-400 hover:shadow-lg transition-all">
                        <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-500 transition-colors">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-blue-600 group-hover:text-white"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                <path
                                    fillRule="evenodd"
                                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">
                            Custom Rubrics
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Define your own grading criteria with detailed
                            rubrics. AI evaluates each section independently and
                            provides point-by-point feedback aligned with your
                            standards.
                        </p>
                    </div>
                    <div className="group rounded-xl border-2 border-gray-200 p-8 hover:border-purple-400 hover:shadow-lg transition-all">
                        <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4 group-hover:bg-purple-500 transition-colors">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-purple-600 group-hover:text-white"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">
                            Instant Feedback
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Get comprehensive grading results in seconds. Each
                            submission includes a detailed breakdown, overall
                            score, constructive feedback, and suggestions for
                            improvement.
                        </p>
                    </div>
                    <div className="group rounded-xl border-2 border-gray-200 p-8 hover:border-green-400 hover:shadow-lg transition-all">
                        <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4 group-hover:bg-green-500 transition-colors">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-green-600 group-hover:text-white"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">
                            Track Progress
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            View all graded submissions in one place. Track
                            student performance over time, identify patterns,
                            and access detailed grade history for every
                            assignment.
                        </p>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section
                id="how-it-works"
                className="bg-gradient-to-br from-gray-50 to-blue-50"
            >
                <div className="mx-auto max-w-6xl px-4 py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Start grading in 3 simple steps
                        </h2>
                        <p className="text-lg text-gray-600">
                            No complex setup. No training required. Just smart
                            grading.
                        </p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="relative">
                            <div className="absolute -left-4 -top-4 h-16 w-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold shadow-lg">
                                1
                            </div>
                            <div className="bg-white rounded-xl border-2 border-gray-200 p-8 pt-12">
                                <h3 className="text-xl font-semibold mb-3">
                                    Create Assignment
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Set up your programming assignment with
                                    instructions, a custom rubric, programming
                                    language, and total points.
                                </p>
                                <div className="text-sm text-blue-600 font-medium">
                                    → Takes 2 minutes
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute -left-4 -top-4 h-16 w-16 rounded-full bg-purple-500 text-white flex items-center justify-center text-2xl font-bold shadow-lg">
                                2
                            </div>
                            <div className="bg-white rounded-xl border-2 border-gray-200 p-8 pt-12">
                                <h3 className="text-xl font-semibold mb-3">
                                    Submit Student Code
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Paste each student&apos;s code submission.
                                    Enter their name and hit &quot;Grade
                                    Now&quot; to get instant AI-powered
                                    evaluation.
                                </p>
                                <div className="text-sm text-purple-600 font-medium">
                                    → Grade in 10 seconds
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute -left-4 -top-4 h-16 w-16 rounded-full bg-green-500 text-white flex items-center justify-center text-2xl font-bold shadow-lg">
                                3
                            </div>
                            <div className="bg-white rounded-xl border-2 border-gray-200 p-8 pt-12">
                                <h3 className="text-xl font-semibold mb-3">
                                    Review Results
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Get detailed rubric breakdown, overall
                                    grade, feedback comments, and improvement
                                    suggestions. All saved automatically.
                                </p>
                                <div className="text-sm text-green-600 font-medium">
                                    → Instant delivery
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Preview */}
            {/* Language Support */}
            <section className="mx-auto max-w-6xl px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        Support for multiple programming languages
                    </h2>
                    <p className="text-lg text-gray-600">
                        Grade assignments in the languages your students use
                    </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                    {[
                        "Python",
                        "JavaScript",
                        "Java",
                        "C++",
                        "C#",
                        "Ruby",
                        "Go",
                        "TypeScript",
                        "Swift",
                        "Kotlin",
                        "PHP",
                        "Rust",
                    ].map((lang) => (
                        <div
                            key={lang}
                            className="flex items-center justify-center p-4 rounded-lg bg-gray-50 border border-gray-300 font-mono text-sm font-medium text-gray-700"
                        >
                            {lang}
                        </div>
                    ))}
                </div>
            </section>

            {/* Benefits */}
            <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white">
                <div className="mx-auto max-w-6xl px-4 py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Why teachers choose our auto-grader
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-blue-200"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">
                                    Consistent Grading
                                </h3>
                                <p className="text-blue-100">
                                    No more subjective scoring or grader
                                    fatigue. Every student gets evaluated by the
                                    same standards, every time.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-blue-200"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">
                                    Detailed Feedback
                                </h3>
                                <p className="text-blue-100">
                                    Students receive specific, actionable
                                    feedback on every rubric criterion, helping
                                    them understand exactly what to improve.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-blue-200"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">
                                    Time Back for Teaching
                                </h3>
                                <p className="text-blue-100">
                                    Spend less time grading, more time helping
                                    students. Focus on what matters: actually
                                    teaching programming concepts.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-blue-200"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">
                                    FERPA Compliant
                                </h3>
                                <p className="text-blue-100">
                                    Your student data is secure and private.
                                    Built with education compliance in mind from
                                    day one.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="mx-auto max-w-4xl px-4 py-20 text-center">
                <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                    Ready to save 10 hours this week?
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Join educators who are grading smarter with AI. Get started
                    in under 2 minutes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/teacher/grading/dashboard"
                        className="btn-primary text-lg px-8 py-4 justify-center"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Start Grading Free
                    </Link>
                    <Link
                        href="#how-it-works"
                        className="btn-secondary text-lg px-8 py-4 justify-center"
                    >
                        Learn More
                    </Link>
                </div>
                <p className="mt-6 text-sm text-gray-500">
                    No credit card required • Cancel anytime • FERPA compliant
                </p>
            </section>

            {/* Footer */}
            <footer className="border-t bg-gray-50">
                <div className="mx-auto max-w-6xl px-4 py-12">
                    <div className="grid gap-8 md:grid-cols-4">
                        <div className="md:col-span-2">
                            <h3 className="text-lg font-bold mb-3">
                                Teach.onl
                            </h3>
                            <p className="text-sm text-gray-600 mb-4 max-w-sm">
                                AI-powered programming assignment grader that
                                helps educators save time and provide
                                consistent, detailed feedback to students.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-3 text-sm">
                                Product
                            </h4>
                            <nav className="flex flex-col gap-2 text-sm text-gray-600">
                                <Link
                                    href="/teacher/grading/dashboard"
                                    className="hover:text-blue-600"
                                >
                                    Auto-Grader
                                </Link>
                                <Link
                                    href="#how-it-works"
                                    className="hover:text-blue-600"
                                >
                                    How It Works
                                </Link>
                                <Link
                                    href="/teacher"
                                    className="hover:text-blue-600"
                                >
                                    Teacher Dashboard
                                </Link>
                            </nav>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-3 text-sm">
                                Company
                            </h4>
                            <nav className="flex flex-col gap-2 text-sm text-gray-600">
                                <Link href="#" className="hover:text-blue-600">
                                    About
                                </Link>
                                <Link href="#" className="hover:text-blue-600">
                                    Privacy Policy
                                </Link>
                                <Link href="#" className="hover:text-blue-600">
                                    Terms of Service
                                </Link>
                                <Link href="#" className="hover:text-blue-600">
                                    Contact
                                </Link>
                            </nav>
                        </div>
                    </div>
                    <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-gray-500">
                            © {new Date().getFullYear()} Teach.onl. All rights
                            reserved.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="text-gray-400 hover:text-gray-600"
                                aria-label="Twitter"
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-gray-600"
                                aria-label="GitHub"
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-gray-600"
                                aria-label="LinkedIn"
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}
