import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/next";

const bricolage = Bricolage_Grotesque({
    variable: "--font-bricolage",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL(
        process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    ),
    title: "sKILLbot",
    description: "AI Teaching tools for the modern teacher",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        // TODO: Need to switch Clerk to production mode. It's currently in development mode.
        <ClerkProvider appearance={{ variables: { colorPrimary: "#4224eb" } }}>
            <html lang="en">
                <body
                    className={`${bricolage.variable} antialiased`}
                    suppressHydrationWarning={true}
                >
                    <Navbar />
                    {children}
                    <Analytics />
                </body>
            </html>
        </ClerkProvider>
    );
}
