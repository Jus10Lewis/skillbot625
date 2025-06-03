import React from "react";
import Link from "next/link";
import Image from "next/image";
import NavItems from "./NavItems";

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link href="/">
                <Image
                    src="/images/logo.svg"
                    alt="Logo"
                    width={46}
                    height={44}
                />
            </Link>
            <div className="flex items-center gap-8">
                <NavItems />
                <Link href="/sign-in">Sign In</Link>
            </div>
        </nav>
    );
};

export default Navbar;
