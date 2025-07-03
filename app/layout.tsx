import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";

const bricolage = Bricolage_Grotesque({
    variable: "--font-bricolage",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "sKILLbot",
    description: "AI Teaching tools for the modern teacher",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider appearance={{ variables: { colorPrimary: "#fe5933" } }}>
            <html lang="en">
                <body
                    className={`${bricolage.variable} antialiased`}
                    suppressHydrationWarning={true}
                >
                    <Navbar />
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
