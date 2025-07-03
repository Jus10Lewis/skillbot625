"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { subjects } from "@/constants";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const SubjectFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("subject") || "all";
    const [subject, setSubject] = useState(query);

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (subject === "all" || subject === "") {
            params.delete("subject");
        } else {
            params.set("subject", subject);
        }

        // Use router.replace instead of window.history.replaceState
        router.replace(`${window.location.pathname}?${params.toString()}`);
    }, [subject, searchParams, router]);

    return (
        <Select onValueChange={setSubject} value={subject}>
            <SelectTrigger className="input capitalize">
                <SelectValue placeholder="Select a subject" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All subjects</SelectItem>
                {subjects.map((subject) => (
                    <SelectItem
                        key={subject}
                        value={subject}
                        className="capitalize"
                    >
                        {subject}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default SubjectFilter;
