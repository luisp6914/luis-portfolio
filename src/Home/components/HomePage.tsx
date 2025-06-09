import { useEffect, useRef } from "react";
import About from "./About";
import Contact from "./Contact";
import Home from "./Home";
import Projects from "./Projects";
import Skills from "./Skills";
import "../../styles/homepage.css"

// @ts-ignore
import Toast from "bootstrap/js/dist/toast.js";
import axios from "axios";

const HomePage = () => {
    const toastRef = useRef<HTMLDivElement>(null);

    const allVaccinesURL = import.meta.env.VITE_ALL_VACCINES_URL;
    const allPatientsURL = import.meta.env.VITE_ALL_PATIENTS_URL;
    const userPicksURL = import.meta.env.VITE_USER_PICKS_URL;
    //Getting list of vaccines 
    const fetchVaccines = async () => {
        try {
            const response = await axios.get(allVaccinesURL);
            if(response){
                console.log("Fetched Vaccines")
            }
        } catch (error) {
            console.error("Error getting Vaccines [HomePage.tsx]", error)
        }
    }

    //Getting patients
    const fetchPatients = async () => {
        try {
            const response = await axios.get(allPatientsURL);
            if(response){
                console.log("Fetched Patients");
            }
        } catch (error) {
            console.error("Error fetching patients [HomePage.tsx]", error);
        }
    }

    //Fetching the User picks
    const fetchUserPicks = async () => {
        try {
            const response = await axios.get(userPicksURL);
            if(response){
                console.log("Fetched User Picks");
            } 
        } catch (error) {
            console.error("Error fetching User Picks [HomePage.tsx]",error)
        }
    }

    useEffect(() => {
        if (toastRef.current) {
            const toast = new Toast(toastRef.current);
            toast.show();
        }
        fetchPatients();
        fetchUserPicks();
        fetchVaccines();
    }, []);

    return (
        <>
            <div ref={toastRef} className="toast position-fixed bottom-0 end-0 p-3 mb-2 me-2 align-items-center text-white bg-primary border-0 auto-hide" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="d-flex">
                    <div className="toast-body">
                        <b>Please note:</b> The Covid and PC Part Picker Project may load slowly initially as the Render container service starts up. Usually around 3 minutes.
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