import CallToAction from "@/components/CallToAction";
import TutorCard from "@/components/TutorCard";
import TutorsList from "@/components/TutorsList";
import { getAllTutors, getRecentSessions } from "@/lib/actions/tutor.actions";
import { getSubjectColor } from "@/lib/utils";
import { SignedIn, SignedOut } from "@clerk/nextjs";

const Page = async () => {
    const topThreeTutors = await getAllTutors({ limit: 3 });
    const recentSessionTutors = await getRecentSessions(10);

    return (
        <main className="mb-15">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl">Popular Tutors</h1>
                <div className="text-sm">
                    <SignedOut>
                        <span className="text-gray-600">
                            Sign in to access personalized tutors
                        </span>
                    </SignedOut>
                    <SignedIn>
                        <span className="text-green-600">
                            ✓ Signed in - Full access enabled
                        </span>
                    </SignedIn>
                </div>
            </div>
            <section className="home-section">
                {topThreeTutors.map((tutor) => (
                    <TutorCard
                        key={tutor.id}
                        {...tutor}
                        color={getSubjectColor(tutor.subject)}
                    />
                ))}
            </section>
            <section className="home-section">
                <TutorsList
                    title="Recently Completed Sessions"
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
