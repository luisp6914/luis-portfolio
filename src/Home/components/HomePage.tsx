import { useEffect, useRef } from "react";
import About from "./About";
import Contact from "./Contact";
import Home from "./Home";
import Projects from "./Projects";
import Skills from "./Skills";

// @ts-ignore
import Toast from "bootstrap/js/dist/toast.js";

const HomePage = () => {
    const toastRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (toastRef.current) {
            const toast = new Toast(toastRef.current);
            toast.show();
        }
    }, []);

    return (
        <>
            <div ref={toastRef} className="toast position-fixed bottom-0 end-0 p-3 mb-2 me-2 align-items-center text-white bg-primary border-0 auto-hide" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="d-flex">
                    <div className="toast-body">
                        <b>Please note:</b> The Covid and PC Part Picker Project may load slowly initially as the Docker container service starts up. 
                    </div>
                    <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
            <div id="home"> <Home /> </div>
            <div id="about" className="container"> <About /> </div>
            <div id="skills" className="container"> <Skills /> </div>
            <div id="projects" className="pb-5 pt-5"> <Projects /> </div>
            <div id="contact" className="pb-5 pt-5"> <Contact /> </div>
        </>
    );
}

export default HomePage;