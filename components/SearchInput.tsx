"use client";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchInput = () => {
    const pathName = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("topic") || "";

    // Initialize searchQuery with the current URL parameter
    const [searchQuery, setSearchQuery] = useState(query);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (searchQuery.trim() === "") {
                // If the search query is empty, remove the 'topic' parameter
                params.delete("topic");
            } else {
                // Otherwise, set the 'topic' parameter to the search query
                params.set("topic", searchQuery);
            }

            // Update the URL with the new search parameters
            router.push(`${pathName}?${params.toString()}`);

            // Reset the scroll position to the top of the page
            window.scrollTo(0, 0);
        }, 500); // Adjust the delay as needed

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery, router, searchParams, pathName]);

    return (
        <div className="relative border border-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit">
            <Image
                src="/icons/search.svg"
                alt="Search Icon"
                width={15}
                height={15}
            />
            <input
                value={searchQuery}
                placeholder="Search tutors..."
                className="outline-none flex-1 min-w-0"
                type="text"
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    );
};

export default SearchInput;
