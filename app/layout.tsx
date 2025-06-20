import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Head from "next/head";
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
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider appearance={{ variables: { colorPrimary: "#fe5933" } }}>
            <html lang="en">
                <Head>
                    <link
                        rel="icon"
                        type="image/png"
                        href="/favicon-lg.png?v=1"
                    />
                </Head>
                <body className={`${bricolage.variable} antialiased`}>
                    {<Navbar />}
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
