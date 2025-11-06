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
                    {/* FIXME: SignIn interface should have a link for:
                     "Don’t have an account? Sign up" */}
                    <SignInButton>
                        <button className="text-blue-600 hover:text-blue-800">
                            Sign In
                        </button>
                    </SignInButton>
                    {/* FIXME: If you click the SignInButton first, you can't switch to SignUpButton */}
                    <SignUpButton>
                        <button className="btn-primary">Try for Free</button>
                    </SignUpButton>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </nav>
    );
};

export default Navbar;
