"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Switch } from "@/components/ui/switch";

const ShowBookmarkedSwitch = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("bookmarked") === "true";
    const [bookmarked, setBookmarked] = useState(query);

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (bookmarked) {
            params.set("bookmarked", "true");
        } else {
            params.delete("bookmarked");
        }

        router.replace(`${window.location.pathname}?${params.toString()}`);
    }, [bookmarked, searchParams, router]);

    return (
        <div className="flex items-center space-x-2">
            <Switch checked={bookmarked} onCheckedChange={setBookmarked} />
            <label className="text-sm font-medium">Show bookmarked</label>
        </div>
    );
};

export default ShowBookmarkedSwitch;
