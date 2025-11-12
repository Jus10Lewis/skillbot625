"use client";

import Link from "next/link";
import Image from "next/image";
import NavItems from "./NavItems";
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from "@clerk/nextjs";
import { useEffect, useState } from "react";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Add background when scrolled more than 20px
            setIsScrolled(window.scrollY > 20);
        };

        // Add scroll listener
        window.addEventListener("scroll", handleScroll);

        // Cleanup
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200"
                    : "bg-transparent"
            }`}
        >
            <div className="flex items-center justify-between mx-auto w-full px-14 py-4 max-sm:px-4">
                <Link href="/" className="flex items-center gap-3 group">
                    <Image
                        src="/images/cropped-logo.png"
                        alt="Teach.onl Logo"
                        width={100}
                        height={100}
                        className="transition-transform group-hover:scale-105"
                    />
                    <div className="flex flex-col leading-tight max-sm:hidden">
                        <span className="text-3xl font-extrabold tracking-tight text-primary">
                            Teach<span className="text-purple-600">.onl</span>
                        </span>
                        <span className="text-xs text-gray-500 font-semibold tracking-wide uppercase">
                            AI Teaching Tools
                        </span>
                    </div>
                </Link>
                <div className="flex items-center gap-8">
                    <NavItems />
                    <SignedOut>
                        {/* FIXME: SignIn interface should have a link for:
                     "Don't have an account? Sign up" */}
                        <SignInButton>
                            <button className="text-blue-600 hover:text-blue-800 font-medium">
                                Sign In
                            </button>
                        </SignInButton>
                        {/* FIXME: If you click the SignInButton first, you can't switch to SignUpButton */}
                        <SignUpButton>
                            <button className="btn-primary">
                                Try for Free
                            </button>
                        </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
