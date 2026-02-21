import { useState } from "react";

export function useNavigation(pages) {
    const [currentPage, setCurrentPage] = useState(pages[0]);

    function navigate(page) {
        setCurrentPage(page);
    }

    return { currentPage, navigate };
}