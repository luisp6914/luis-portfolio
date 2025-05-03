import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"


const useSmoothScroll = (offset: number = 70) => {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState("");

    useEffect(() => {
        //Set the active link based on the hash from the location
        setActiveLink(location.hash.replace("#", ""));
    }, [location])

    const handleScroll = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
        event.preventDefault();
        const element = document.getElementById(targetId);

        if (element) {
            const yCoordinate = element.getBoundingClientRect().top + window.scrollY;
            const yOffset = -offset;

            window.scrollTo({
                top: yCoordinate + yOffset, 
                behavior: "smooth"
            });

            //Update the url hash without jumping
            window.history.pushState({}, "", `#${targetId}`);
        }
    };

    useEffect(() => {
        const handleScrollEvent = () => {
            const sections = document.querySelectorAll<HTMLElement>("section, div[id]"); //target sectons or divs with ids
            const scrollPosition = window.scrollY;

            sections.forEach((section) => {
                if( section.offsetTop - offset <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition){
                    setActiveLink(section.id);
                }
            })
        };

        window.addEventListener("scroll", handleScrollEvent);
        return () => {
            window.removeEventListener("scroll", handleScrollEvent);
        };

    }, [offset])
    
    return {activeLink, handleScroll};
}

export default useSmoothScroll;