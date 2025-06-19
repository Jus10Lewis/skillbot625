import TutorForm from "@/components/TutorForm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const NewTutor = async () => {
    const { userId } = await auth();
    // If user is not authenticated, redirect to sign-in
    if (!userId) {
        redirect("/sign-in");
    }

    return (
        <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center">
            <article className="w-full gap-4 flex flex-col">
                <h1>Companion Builder</h1>
                <TutorForm />
            </article>
        </main>
    );
};

export default NewTutor;
