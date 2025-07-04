import TutorForm from "@/components/TutorForm";
import { newTutorPermissions } from "@/lib/actions/tutor.actions";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const NewTutor = async () => {
    const { userId } = await auth();
    // If user is not authenticated, redirect to sign-in
    if (!userId) {
        redirect("/sign-in");
    }

    const canCreateTutor = await newTutorPermissions();

    return (
        <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center">
            {canCreateTutor ? (
                <article className="w-full gap-4 flex flex-col">
                    <h1>Tutor Builder</h1>
                    <TutorForm />
                </article>
            ) : (
                <article className="tutor-limit">
                    <Image
                        src="/images/limit.svg"
                        alt="Tutor Limit Reached"
                        width={360}
                        height={230}
                    />
                    <div className="cta-badge">Upgrade Your Plan</div>
                    <h1>You&apos;ve Reached Your Tutor Limit</h1>
                    <p>
                        To create more tutors, please upgrade your subscription
                        plan.
                    </p>
                    <Link
                        href="/subscription"
                        className="btn-primary w-full justify-center"
                    >
                        Upgrade Now
                    </Link>
                </article>
            )}
        </main>
    );
};

export default NewTutor;
