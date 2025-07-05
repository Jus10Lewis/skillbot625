import TutorsList from "@/components/TutorsList";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { getUserSessions, getUserTutors } from "@/lib/actions/tutor.actions";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

const Profile = async () => {
    const user = await currentUser();
    if (!user) {
        redirect("/sign-in");
        return; // This helps TypeScript understand
    }

    const allUserTutors = await getUserTutors(user.id);
    const sessionHistory = await getUserSessions(user.id);

    return (
        <main className="min-lg:w-3/4">
            <section className="flex justify-between gap-4 max-sm:flex-col items-center">
                <div className="flex gap-4 items-center">
                    <Image
                        src={user.imageUrl}
                        alt={user.firstName || "User Avatar"}
                        width={110}
                        height={110}
                    />
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">
                            {user.firstName} {user.lastName}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {user.emailAddresses[0]?.emailAddress ||
                                "No email provided"}
                        </p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="border border-black rounded-lg p-3 gap-2 flex flex-col h-fit min-w-[175px]">
                        <div className="flex items-center gap-2">
                            <Image
                                src="/icons/check.svg"
                                alt="Check Icon"
                                width={22}
                                height={22}
                            />
                            <p className="text-2xl font-bold">
                                {sessionHistory.length}
                            </p>
                        </div>
                        <div>Lessons Completed</div>
                    </div>
                    <div className="border border-black rounded-lg p-3 gap-2 flex flex-col h-fit min-w-[175px]">
                        <div className="flex items-center gap-2">
                            <Image
                                src="/icons/cap.svg"
                                alt="Check Icon"
                                width={22}
                                height={22}
                            />
                            <p className="text-2xl font-bold">
                                {allUserTutors.length}
                            </p>
                        </div>
                        <div>Tutors Created</div>
                    </div>
                </div>
            </section>
            <Accordion type="multiple">
                <AccordionItem value="recent">
                    <AccordionTrigger className="text-2xl font-bold">
                        Recent Sessions
                    </AccordionTrigger>
                    <AccordionContent>
                        <TutorsList
                            title="Recent Sessions"
                            tutors={sessionHistory}
                        />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="tutors">
                    <AccordionTrigger className="text-2xl font-bold">
                        My Tutors {`(${allUserTutors.length})`}
                    </AccordionTrigger>
                    <AccordionContent>
                        <TutorsList title="My Tutors" tutors={allUserTutors} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </main>
    );
};

export default Profile;
