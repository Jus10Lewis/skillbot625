import Image from "next/image";
import Link from "next/link";

interface TutorCardProps {
    id: string;
    name: string;
    topic: string;
    subject: string;
    duration: number;
    color: string;
}

const TutorCard = ({
    id,
    name,
    topic,
    subject,
    duration,
    color,
}: TutorCardProps) => {
    return (
        <article className="Tutor-card" style={{ backgroundColor: color }}>
            <div className="flex justify-between items-center">
                <div className="subject-badge">{subject}</div>
                <button className="tutor-bookmark">
                    <Image
                        src="/icons/bookmark.svg"
                        alt="Bookmark Icon"
                        width={12.5}
                        height={15}
                    />
                </button>
            </div>
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-sm">Topic: {topic}</p>
            <div className="flex items-center gap-2">
                <Image
                    src="/icons/clock.svg"
                    alt="Clock Icon"
                    width={13.5}
                    height={13.5}
                />
                <p className="text-sm">{duration} minutes</p>
            </div>
            <Link href={`/tutors/${id}`} className="tutor-card-link">
                <button className="btn-primary w-full justify-center">
                    Launch Tutor
                </button>
            </Link>
        </article>
    );
};

export default TutorCard;
