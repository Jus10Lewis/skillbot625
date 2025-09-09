"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
    addToBookmarks,
    removeFromBookmarks,
} from "@/lib/actions/tutor.actions";

interface TutorCardProps {
    id: string;
    name: string;
    topic: string;
    subject: string;
    duration: number;
    color: string;
    bookmarked?: boolean;
}

const TutorCard = ({
    id,
    name,
    topic,
    subject,
    duration,
    color,
    bookmarked = false,
}: TutorCardProps) => {
    const [isBookmarked, setIsBookmarked] = useState(bookmarked);
    const [isLoading, setIsLoading] = useState(false);

    const handleBookmarkToggle = async () => {
        setIsLoading(true);
        try {
            if (isBookmarked) {
                await removeFromBookmarks(id);
                setIsBookmarked(false);
            } else {
                await addToBookmarks(id);
                setIsBookmarked(true);
            }
        } catch (error) {
            console.error("Error toggling bookmark:", error);
            // Reset the optimistic update if there was an error
            setIsBookmarked(bookmarked);
            // Optionally show a toast notification here
            alert(
                `Failed to ${
                    isBookmarked ? "remove" : "add"
                } bookmark. Please try again.`
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <article className="tutor-card" style={{ backgroundColor: color }}>
            <div className="flex justify-between items-center">
                <div className="subject-badge  min-w-[85px] text-center">
                    {subject}
                </div>
                <button
                    className="tutor-bookmark"
                    onClick={handleBookmarkToggle}
                    disabled={isLoading}
                >
                    <Image
                        src={
                            isBookmarked
                                ? "/icons/bookmark-filled.svg"
                                : "/icons/bookmark.svg"
                        }
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
            <Link
                href={`/ai-tutors/community/${id}`}
                className="tutor-card-link"
            >
                <button className="btn-primary w-full justify-center">
                    Launch Tutor
                </button>
            </Link>
        </article>
    );
};

export default TutorCard;
