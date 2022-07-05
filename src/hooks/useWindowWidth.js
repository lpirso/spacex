import { useEffect, useState } from "react";

export const useWindowWidth = () => {
    let initialState;
    if (window.innerWidth < 1024) {
        initialState = true;
    } else {
        initialState = false;
    }
    const [isMobile, setIsMobile] = useState(initialState);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    });

    return {
        isMobile,
    };
};
