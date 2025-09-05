import CallToAction from "@/components/CallToAction";
import type { Metadata } from "next";
import TutorCard from "@/components/TutorCard";
import TutorsList from "@/components/TutorsList";
import { getAllTutors, getRecentSessions } from "@/lib/actions/tutor.actions";
import { getSubjectColor } from "@/lib/utils";
import { SignedIn, SignedOut } from "@clerk/nextjs";

const Page = async () => {
    const topThreeTutors = await getAllTutors({ limit: 3 });
    const recentSessionTutors = await getRecentSessions(10);

    // TODO: Popular tutors section is only showing the most recently created tutors
    // This could be changed to show the most popular tutors based on user interactions, ratings, or completion counts
    return (
        <main className="mb-15">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl">Popular Community Tutors</h1>
                <div className="text-sm">
                    <SignedOut>
                        <span className="text-gray-600">
                            Sign in to access personalized tutors
                        </span>
                    </SignedOut>
                    <SignedIn>
                        <span className="text-green-600">✓ Signed in</span>
                    </SignedIn>
                </div>
            </div>
            <section className="home-section">
                {topThreeTutors.map((tutor) => (
                    <TutorCard
                        key={tutor.id}
                        {...tutor}
                        color={getSubjectColor(tutor.subject)}
                        bookmarked={tutor.bookmarked}
                    />
                ))}
            </section>
            <section className="home-section">
                <TutorsList
                    title="Recently Completed Community Sessions"
                    tutors={recentSessionTutors}
                    classNames="w-2/3 max-lg:w-full"
                    showDuplicates={false}
                />
                <CallToAction />
            </section>
        </main>
    );
};

export default Page;

export const metadata: Metadata = {
    title: "AI Tutors — Skillbot",
    description:
        "Explore community tutors and recent sessions. Personalized AI guidance for every learner.",
};
