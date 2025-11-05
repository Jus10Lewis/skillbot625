import Image from "next/image";
import type { Metadata } from "next";

export default function ComingSoon() {
    return (
        <main className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-background via-background to-primary/5">
            <div className="relative max-w-3xl mx-auto">
                {/* Decorative background blur */}
                <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full transform -translate-y-12 scale-110" />

                {/* Image container with professional styling */}
                <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-border/50">
                    <Image
                        src="/images/ComingSoon.png"
                        alt="Coming Soon"
                        width={800}
                        height={800}
                        priority
                        className="w-full h-auto rounded-2xl"
                    />
                </div>
            </div>
        </main>
    );
}

export const metadata: Metadata = {
    title: "Coming Soon — Skillbot",
    description:
        "This feature is currently under construction. Check back soon!",
};
