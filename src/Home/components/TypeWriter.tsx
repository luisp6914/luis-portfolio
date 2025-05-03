import { useEffect, useRef } from "react";
import Typed from "typed.js";


const TypeWriter = () => {
    const el = useRef<HTMLParagraphElement | null>(null);
    const typed = useRef<Typed | null>(null);

    useEffect(() => {
        const options = {
            strings: ["A Software Engineer", "Welcome to my website!"],
            typeSpeed: 75,
            backSpeed: 55,
            backDelay: 2000,
            loop: true,
        };

        if(el.current){
            typed.current = new Typed(el.current, options);
        }

        return () => {
            if(typed.current){
                typed.current.destroy();
            }
        }
    }, []);

    return <p ref={el} />;

}

export default TypeWriter;