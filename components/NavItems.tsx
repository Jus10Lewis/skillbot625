"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "/", label: "Home" },
    { href: "/all-community-tutors", label: "Community" },
    { href: "/my-tutors", label: "My Tutors" },
    { href: "/subscription", label: "Pricing" },
];

const NavItems = () => {
    const pathname = usePathname();

    return (
        <nav className="flex items-center gap-4">
            {navItems.map((item) => (
                <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                        pathname === item.href && "text-primary font-semibold"
                    )}
                >
                    {item.label}
                </Link>
            ))}
        </nav>
    );
};

export default NavItems;
