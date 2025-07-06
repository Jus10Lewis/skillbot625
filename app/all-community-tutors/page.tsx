import SearchInput from "@/components/SearchInput";
import ShowBookmarkedSwitch from "@/components/ShowBookmarkedSwitch";
import SubjectFilter from "@/components/SubjectFilter";
import TutorCard from "@/components/TutorCard";
import { getAllTutors } from "@/lib/actions/tutor.actions";
import { getSubjectColor } from "@/lib/utils";

const TutorsLibrary = async ({ searchParams }: SearchParams) => {
    const filters = await searchParams;
    const subject = filters.subject ? filters.subject : "";
    const topic = filters.topic ? filters.topic : "";
    const bookmarked = filters.bookmarked === "true";

    const tutors = await getAllTutors({ subject, topic, bookmarked });

    return (
        // TODO: Shouldn't be sharing all tutors with the community
        // Users can create inappropriate tutors
        // Need to implement moderation or approval system or report system
        // create setting for users to choose if they want to share their tutors with the community
        <main>
            <section className="flex justify-between gap-4 max-sm:flex-col">
                <h1>Community Tutors Library</h1>
                <div className="flex gap-4">
                    <SearchInput />
                    <SubjectFilter />
                    <ShowBookmarkedSwitch />
                </div>
            </section>
            <section className="tutors-grid">
                {tutors.map((tutor) => (
                    <TutorCard
                        key={tutor.id}
                        {...tutor}
                        color={getSubjectColor(tutor.subject)}
                    />
                ))}
            </section>
        </main>
    );
};

export default TutorsLibrary;
