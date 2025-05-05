import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Projects = () => {
    useEffect(() => {
        const handleScroll = () => {
            const elements = document.querySelectorAll(".fade-in");
            elements.forEach((element) => {
                const rect = element.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom >= 0) {
                    element.classList.add("visible");
                } else {
                    element.classList.remove("visible");
                }
            });
        };

        window.addEventListener("scroll", handleScroll);

        // Trigger the scroll handler to check the initial position
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const projects = [
        {
            class: "dijiKeyAPI",
            icon: "fluent:cloud-desktop-20-regular",
            name: "DijiKey API",
            discription: "This React web app integrates the DigiKey API for searching electronic components by category ID, keyword, or browsing computer equipment categorires. It securely fetches data using authentication tokens and keeping credentials in a .env file. ",
            path: "/digikey-api", //
            finished: true,
        },
        {
            class: "covidProject",
            icon: "covid:covid19-virus-1",
            name: "Covid Project",
            discription:
                "Developed an online system to help a hypothetical local hospital for its COVID vaccination effort. The system will keep track of both patient and vaccine information for the hospital",
            path: "#", ///covid-project
            finished: false,
        },
        {
            class: "pcPartPicker",
            icon: "material-symbols-light:barcode-scanner-rounded",
            name: "PC Part Picker",
            discription:
                "Developed an interface where users can select different PC parts from a given list. The price for the selected PC components are then displayed at checkout.",
            path: "#", ///pcpartpicker
            finished: false,
        },
        // {
        //     class: "teslaStockProject",
        //     icon: "arcticons:stockswidget",
        //     name: "Tesla Stocks Project",
        //     discription:
        //         "Developed a program that reads and processes historic stock data for the Tesla Company. The data is extracted from a .csv file and then processed to display the information.",
        //     path: "#", //tesla-stocks-project
        //     finished: false,
        // },
        // {
        //     class: "linkedList",
        //     icon: "material-symbols:linked-services-outline",
        //     name: "2D Liked List Project",
        //     discription:
        //         "Developed a generic program that accepts an array list of information and turns it into 2D Linked List data structure.",
        //     path: "#", //linked-list
        //     finished: false,
        // },
        
    ];


    return (
        <div className="container">
            <h1>Projects</h1>
            <div className="projects row">
                {projects.map((project, index) => (
                    <div key={index} className="card project col-md-4 fade-in " style={{ width: '400px', height: '350px' }}>
                        {!project.finished && (
                            <div className="ribbon"><span>In Progress</span></div>
                        )}
                        <div className={`icon-container ${project.class}`}>
                            <Icon icon={project.icon} className='fa-icon'></Icon>
                        </div>
                        <div className="card-body">
                            <h3 className="card-title">{project.name}</h3>
                            <p className="card-text">{project.discription}</p>
                            <Link className={`btn btn-primary rounded-pill try-it ${!project.finished ? 'disabled' : ''}`} to={project.path}>Try It</Link>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Projects;