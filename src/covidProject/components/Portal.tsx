import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Portal = () => {

    useEffect(() => {
        window.scrollTo(0,0);
    },[]);

    return(
        <>
            <div className="portal-container">
                <div className="cards">
                    <div className="card text-center">
                        <div className="card-body patient-option">
                            <h5 className="card-title"> <Icon className="portal-icon patient-portal-icon" icon="ph:users-three-thin" /> </h5>
                            <Link className="btn btn-primary btn-text" to="/covid-project/patients">Patient Portal</Link>
                            <p className="card-text portal-text"> Manage all the patietns and their information </p>
                        </div>
                    </div>
                    <div className="card text-center">
                        <div className="card-body vaccine-patient">
                            <h5 className="card-title"> <Icon className="portal-icon vaccine-portal-icon" icon="material-symbols-light:vaccines-outline" /> </h5>
                            <Link className="btn btn-primary btn-text" to="/covid-project/vaccines">Vaccine Portal</Link>
                            <p className="card-text portal-text"> Manage all the vaccines and their information </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Portal;
