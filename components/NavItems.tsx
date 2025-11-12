"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const NavItems = () => {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    // Fix for hydration mismatch: Wait until component mounts on client before applying active styles
    // Hydration is when React attaches to server-rendered HTML. If server HTML differs from client HTML,
    // React throws an error. By using 'mounted' state, we ensure server and client render identical HTML
    // initially (no active styles), then apply active styles only after client-side hydration completes.
    // This prevents the mismatch between server (no pathname) and client (has pathname from usePathname).
    useEffect(() => {
        setMounted(true);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const aiTutorsActive = mounted && pathname.startsWith("/ai-tutors");

    const linkBase = "transition-colors hover:text-primary";

    return (
        <nav className="flex items-center gap-4">
            {/* Home */}
            <Link
                href="/"
                className={cn(
                    linkBase,
                    mounted && pathname === "/" && "text-primary font-semibold"
                )}
            >
                Home
            </Link>

            {/* AI Tutors Dropdown */}
            <div className="relative" ref={dropdownRef}>
                <button
                    type="button"
                    onClick={() => setOpen((o) => !o)}
                    className={cn(
                        "flex items-center gap-1",
                        linkBase,
                        aiTutorsActive && "text-primary font-semibold"
                    )}
                    aria-haspopup="menu"
                    aria-expanded={open}
                >
                    AI Tutors
                    <span
                        className={cn(
                            "inline-block transform transition-transform text-xs",
                            open && "rotate-180"
                        )}
                    >
                        ▼
                    </span>
                </button>
                {open && (
                    <div
                        role="menu"
                        className="absolute left-0 mt-2 w-56 rounded-md border bg-white shadow-lg z-50 py-2 text-sm"
                    >
                        <Link
                            href="/ai-tutors"
                            onClick={() => setOpen(false)}
                            className={cn(
                                "block px-4 py-2 hover:bg-gray-100",
                                mounted &&
                                    pathname === "/ai-tutors" &&
                                    "bg-gray-100 font-medium text-primary"
                            )}
                            role="menuitem"
                        >
                            Tutor Dashboard
                        </Link>
                        <Link
                            href="/ai-tutors/community"
                            onClick={() => setOpen(false)}
                            className={cn(
                                "block px-4 py-2 hover:bg-gray-100",
                                mounted &&
                                    pathname.startsWith(
                                        "/ai-tutors/community"
                                    ) &&
                                    "bg-gray-100 font-medium text-primary"
                            )}
                            role="menuitem"
                        >
                            Community Tutors
                        </Link>
                        <Link
                            href="/ai-tutors/history"
                            onClick={() => setOpen(false)}
                            className={cn(
                                "block px-4 py-2 hover:bg-gray-100",
                                mounted &&
                                    pathname.startsWith("/ai-tutors/history") &&
                                    "bg-gray-100 font-medium text-primary"
                            )}
                            role="menuitem"
                        >
                            Session History
                        </Link>
                    </div>
                )}
            </div>

            {/* Teacher Tools section */}
            <Link
                href="/teacher"
                className={cn(
                    linkBase,
                    mounted &&
                        pathname.startsWith("/teacher") &&
                        "text-primary font-semibold"
                )}
            >
                Teacher Tools
            </Link>

            {/* Pricing */}
            <Link
                href="/subscription"
                className={cn(
                    linkBase,
                    mounted &&
                        pathname === "/subscription" &&
                        "text-primary font-semibold"
                )}
            >
                Pricing
            </Link>
        </nav>
    );
};

export default NavItems;
