import { Icon } from "@iconify/react";
import useSmoothScroll from "../Home/hooks/useSmoothScroll";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  // Handles the smooth scroll to different tabs in home page
  const { activeLink, handleScroll } = useSmoothScroll();

  //Variables to locate the current path
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  /*-------Handle naviation to projects when in coivd project path--------*/
  /**
   * checks if we are in the current root path, if we are not, then it navitates to it.
   * @param e the mouse event
   */
  const handleProjectsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if(currentPath !== "/"){
      navigate("/#projects", {replace: true});
      setTimeout(() => {
        const element = document.getElementById("projects");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  //The const logo containing the logo Link which is used by all
  const logo = (
    <Link to="/" className="navbar-brand">
      <Icon icon="tabler:circle-letter-l" width="48" height="48" />
    </Link>
  );

  //Home page nav when we are at root path
  const homePageNav = (
    <nav className="navbar navbar-expand-lg bg-light fixed-top">
      <div className="container-fluid">
        {/* Logo */}
        {logo}

        {/* Nav drop down tab */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbaMarkup" aria-controls="navbaMarkup" aria-expanded="false" aria-label="Toggle navigation" >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbaMarkup">
          <div className="navbar-nav">
            <Link to="#home" className={`nav-link ${activeLink === "home" ? "active" : ""}`} onClick={(e) => handleScroll(e, "home")}>
              Home
            </Link>

            <Link to="#about" className={`nav-link ${activeLink === "about" ? "active" : ""}`} onClick={(e) => handleScroll(e, "about")}>
              About
            </Link>

            <Link to="skills" className={`nav-link ${activeLink === "skills" ? "active" : ""}`} onClick={(e) => handleScroll(e, "skills")}>Skills</Link>

            <Link to="#projects" className={`nav-link ${activeLink === "projects" ? "active" : ""}`} onClick={(e) => handleScroll(e, "projects")} >
              Projects
            </Link>

            <Link to="#contact" className={`nav-link ${activeLink === "contact" ? "active" : ""}`} onClick={(e) => handleScroll(e, "contact")}>
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );

  //Covid navbar when the path is the covid project
  const covidNav = (
    <nav className="navbar navbar-expand-lg bg-light fixed-top">
      <div className="container-fluid">
        {/*Logo */}
        {logo}

        {/**Nav button */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation" >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
                {/*Dashboard Tab */}
                <Link className="nav-link" to="/covid-project" aria-current="page">
                    Dashboard
                </Link>

                {/*Project Tab */}
                <Link className="nav-link" to="/" onClick={handleProjectsClick}>
                    Projects
                </Link>

                {/*Dynamic Tab */}
                <Link className="nav-link" to={currentPath === "/covid-project/patients" ? "/covid-project/vaccines" : "/covid-project/patients"}>
                    {currentPath === "/covid-project/patients" ? "Vaccines" : "Patients"}
                </Link>
            </div>
        </div>

      </div>
    </nav>
  );

  const digiPartPickerNav = (
    <nav className="navbar navbar-expand-lg bg-light fixed-top">
      <div className="container-fluid">
        {/*Logo */}
        {logo}

        {/**Nav button */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation" >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
                {/*Project Tab */}
                <Link className="nav-link" to="/" onClick={handleProjectsClick}>
                    Projects
                </Link>
            </div>
        </div>

      </div>
    </nav>
  );

  return (
    <>
      {currentPath === "/" || currentPath === "/home" || currentPath === "/about" || currentPath === "/contact" || currentPath === "/projects" ? homePageNav : 
        currentPath === "/covid-project/patients" || currentPath === "/covid-project/vaccines" ? covidNav : 
        currentPath === "/digikey-api" || currentPath === "/pcpartpicker" || currentPath === "/pcpartpicker/cpu" || currentPath === "/pcpartpicker/gpu" || currentPath === "/pcpartpicker/motherboard" || currentPath === "/pcpartpicker/memory" || currentPath === "/pcpartpicker/storage"  || currentPath === "/pcpartpicker/case" || currentPath === "/pcpartpicker/psu" || currentPath === "/pcpartpicker/monitor" ? digiPartPickerNav : ""
      }
    </>
  );
};

export default Navbar;