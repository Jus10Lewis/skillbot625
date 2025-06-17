import CallToAction from "@/components/CallToAction";
import TutorCard from "@/components/TutorCard";
import TutorsList from "@/components/TutorsList";
import { recentSessions } from "@/constants";
import { SignedIn, SignedOut } from "@clerk/nextjs";

const Page = () => {
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
                <TutorCard
                    id="123"
                    name="Neura the Brainy Explorer"
                    topic="Neural Network of the Brain"
                    subject="Science"
                    duration={45}
                    color="#ffda6e"
                />
                <TutorCard
                    id="456"
                    name="Countsy the Math Wizard"
                    topic="Derivatives and Integrals"
                    subject="Math"
                    duration={30}
                    color="#e5d0ff"
                />
                <TutorCard
                    id="789"
                    name="Verba the Vocabulary Virtuoso"
                    topic="Advanced Vocabulary"
                    subject="English"
                    duration={30}
                    color="#bde7ff"
                />
            </section>
            <section className="home-section">
                <TutorsList
                    title="Recently Completed Sessions"
                    tutors={recentSessions}
                    classNames="w-2/3 max-lg:w-full"
                />
                <CallToAction />
            </section>
        </main>
    );
};

export default Page;
