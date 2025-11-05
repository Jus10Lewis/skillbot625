import TutorsList from "@/components/TutorsList";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    getUserSessions,
    getUserTutors,
    getUserUsageMinutes,
    // getBookmarkedTutors,
} from "@/lib/actions/tutor.actions";
import { currentUser, auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

const History = async () => {
    const user = await currentUser();
    if (!user) {
        redirect("/sign-in");
        return; // TypeScript safety
    }

    const allUserTutors = await getUserTutors(user.id);
    const sessionHistory = await getUserSessions(user.id);
    // const bookmarkedTutors = await getBookmarkedTutors(user.id);

    // Get usage information
    const { has } = await auth();
    const isPro = has({ plan: "pro" });
    let usage = null;
    if (!isPro) {
        try {
            usage = await getUserUsageMinutes(user.id);
        } catch (error) {
            console.error("Failed to fetch usage:", error);
        }
    }

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
                <div className="flex gap-4 flex-wrap">
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
                    {!isPro && usage && (
                        <>
                            <div className="border border-black rounded-lg p-3 gap-2 flex flex-col h-fit min-w-[175px]">
                                <div className="flex items-center gap-2">
                                    <Image
                                        src="/icons/clock.svg"
                                        alt="Clock Icon"
                                        width={22}
                                        height={22}
                                    />
                                    <p className="text-2xl font-bold">
                                        {usage.dailyMinutes}/{usage.dailyLimit}
                                    </p>
                                </div>
                                <div>Daily Minutes Used</div>
                            </div>
                            <div className="border border-black rounded-lg p-3 gap-2 flex flex-col h-fit min-w-[175px]">
                                <div className="flex items-center gap-2">
                                    <Image
                                        src="/icons/clock.svg"
                                        alt="Clock Icon"
                                        width={22}
                                        height={22}
                                    />
                                    <p className="text-2xl font-bold">
                                        {usage.monthlyMinutes}/
                                        {usage.monthlyLimit}
                                    </p>
                                </div>
                                <div>Monthly Minutes Used</div>
                            </div>
                        </>
                    )}
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
                        My Tutors ({allUserTutors.length})
                    </AccordionTrigger>
                    <AccordionContent>
                        <TutorsList title="My Tutors" tutors={allUserTutors} />
                    </AccordionContent>
                </AccordionItem>
                {/* Bookmarked section kept commented out intentionally */}
            </Accordion>
        </main>
    );
};

export default History;
