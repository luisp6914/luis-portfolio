import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import { useState } from "react";

interface Patient {
    id: number;
    firstName: string;
    lastName: string;
    vaccineName: string;
    vaccineDosesRequired: number;
    dose1Date: string;
    dose2Date: string;
}

interface FetchedPatientsTableProps {
    patients: Patient[];
    fetchPatients: () => void;
}

const FetchedPatientsTable = ({ patients, fetchPatients }: FetchedPatientsTableProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const patientsPerPage = 15;

    //Calculate total pages 
    const totalPages = Math.ceil(patients.length / patientsPerPage);

    //Get current patients
    const indexOfLastPatient = currentPage * patientsPerPage;
    const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
    const currentPatients = patients.slice(indexOfFirstPatient, indexOfLastPatient);

    //Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const addingSecondDose = async (patient: Patient) => {
        const addingSecondDoseURL = `${import.meta.env.VITE_ADD_SECOND_DOSE_URL}${patient.id}`
        try {
            //TODO
            const response = await axios.post(addingSecondDoseURL);
            console.log("Second dose entered status", response.status);
            fetchPatients();
        } catch (error) {
            console.error("Error Adding Second Dose [FetchedPatientsTable.tsx file]", error)
        }
    }

    return (
        <div className="patient-table-wrapper">
            <div className="table table-responsive patient-table">
                <table className="table align-middle">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Patient</th>
                            <th>Vaccine</th>
                            <th>Dose 1</th>
                            <th>Dose 2</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {currentPatients.map((patient) => (
                            <tr key={patient.id}>
                                <td>{patient.id}</td>
                                <td>{patient.firstName + " " + patient.lastName}</td>
                                <td>{patient.vaccineName}</td>
                                <td>{patient.dose1Date}</td>
                                {patient.dose2Date !== null && patient.vaccineDosesRequired === 2 ? (
                                    <td>{patient.dose2Date}</td>
                                ) : patient.dose2Date === null && patient.vaccineDosesRequired === 2 ? (
                                    <td>
                                        <button className="btn addSecondDoseBtn" style={{ background: "orange", color: "#fff" }} onClick={() => addingSecondDose(patient)}>
                                            <Icon icon="zondicons:add-solid"/> Add Next Dose
                                        </button>
                                    </td>
                                ) : (
                                    <td title="Vaccine Completed"> <span title="Vaccine Completed"> <Icon className="finished-icon" icon="material-symbols:check" style={{color: "#1eff00"}} /> </span> </td>
                                )}

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <nav className="pagination-container">
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => paginate(currentPage - 1)}> <Icon icon="zondicons:cheveron-left" /> </button>
                    </li>
                    {[...Array(totalPages)].map((_, index) => (
                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                            <button onClick={() => paginate(index + 1)} className="page-link">
                                {index + 1}
                            </button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ''}`}>
                        <button className="page-link" onClick={() => paginate(currentPage + 1)}> <Icon icon="zondicons:cheveron-right" /> </button>
                    </li>
                </ul>
            </nav>
        </div>
    );

}

export default FetchedPatientsTable;