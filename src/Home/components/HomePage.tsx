import About from "./About";
import Contact from "./Contact";
import Home from "./Home";
import Projects from "./Projects";
import Skills from "./Skills";

const HomePage = () => {
    return (
        <>
            <div id="home"> <Home/> </div>
            <div id="about" className="container"> <About/> </div>
            <div id="skills" className="container"> <Skills /> </div>
            <div id="projects" className="pb-5 pt-5"> <Projects/> </div>
            <div id="contact" className="pb-5 pt-5"> <Contact/> </div>
        </>
    );
}

export default HomePage;