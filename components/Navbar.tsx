import Link from "next/link";
import Image from "next/image";
import NavItems from "./NavItems";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link href="/">
                <Image
                    src="/images/full-logo.png"
                    alt="Logo"
                    width={100}
                    height={100}
                />
            </Link>
            <div className="flex items-center gap-8">
                <NavItems />
                <SignedOut>
                    <SignInButton>
                        <button className="text-blue-600 hover:text-blue-800">
                            Sign In
                        </button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </nav>
    );
};

export default Navbar;
