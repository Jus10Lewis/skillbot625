import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn, getSubjectColor } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface TutorsListProps {
    title: string;
    tutors: {
        id: string;
        name: string;
        subject: string;
        topic: string;
        duration: number;
        session_history_id?: string;
    }[];
    classNames?: string;
    showDuplicates?: boolean; // New prop to control duplicate display
}

const TutorsList = ({
    title,
    tutors,
    classNames,
    showDuplicates = true,
}: TutorsListProps) => {
    // Filter out duplicates if showDuplicates is false
    const displayTutors = showDuplicates
        ? tutors
        : tutors.filter(
              (tutor, index, array) =>
                  array.findIndex((t) => t.id === tutor.id) === index
          );

    return (
        <article className={cn("tutor-list", classNames)}>
            <h2 className="text-lg font-semibold">{title}</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-lg w-2/3">Lessons</TableHead>
                        <TableHead className="text-lg">Subject</TableHead>
                        <TableHead className="text-lg text-right">
                            Duration
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {displayTutors?.map(
                        ({
                            id,
                            name,
                            subject,
                            topic,
                            duration,
                            session_history_id,
                        }) => (
                            <TableRow key={session_history_id || id}>
                                {/* Use session_id if available, otherwise fall back to id */}
                                <TableCell>
                                    <Link
                                        href={`/ai-tutors/community/${id}`}
                                        className="flex items-center gap-2"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden"
                                                style={{
                                                    backgroundColor:
                                                        getSubjectColor(
                                                            subject
                                                        ),
                                                }}
                                            >
                                                <Image
                                                    src={`/icons/${subject}.svg`}
                                                    alt={subject}
                                                    width={35}
                                                    height={35}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <p className="font-bold text-2xl">
                                                    {name}
                                                </p>
                                                <p className="text-lg">
                                                    {topic}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <div className="subject-badge w-fit min-w-[85px] text-center max-md:hidden">
                                        {subject}
                                    </div>
                                    <div
                                        className="flex items-center justify-center rounded-lg w-fit p-2 md:hidden"
                                        style={{
                                            backgroundColor:
                                                getSubjectColor(subject),
                                        }}
                                    >
                                        <Image
                                            src={`/icons/${subject}.svg`}
                                            alt={subject}
                                            width={18}
                                            height={18}
                                        />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2 w-full justify-end">
                                        <p className="text-2xl">
                                            {duration}{" "}
                                            <span className="max-md:hidden">
                                                mins
                                            </span>
                                        </p>
                                        <Image
                                            src="/icons/clock.svg"
                                            alt="Clock Icon"
                                            width={14}
                                            height={14}
                                            className="md:hidden"
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        )
                    )}
                </TableBody>
            </Table>
        </article>
    );
};

export default TutorsList;
