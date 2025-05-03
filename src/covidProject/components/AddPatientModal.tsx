import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import { useState } from "react";

interface Vaccine {
    id: number;
    name: string;
}

interface AddPatientModalProps {
    vaccines: Vaccine[];
    fetchPatients: () => void;
}

const AddPatientModal = ({ vaccines, fetchPatients }: AddPatientModalProps) => {
    const addPatientURL = import.meta.env.VITE_ADD_PATIENT_URL;

    const [patientFirstName, setPatientFirstName] = useState("");
    const [patientLastName, setPatientLastName] = useState("");
    const [selectedVaccine, setSelectedVaccine] = useState("");

    //Handling the submitted new patient
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //Getting vaccine Id
        const vaccineId = vaccines.find(v => v.name === selectedVaccine)?.id

        //new patient 
        const newPatient = {
            firstName: patientFirstName,
            lastName: patientLastName,
            vaccineId,
        }

        try {
            const response = await axios.post(addPatientURL, newPatient, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setPatientFirstName("");
            setPatientLastName("");
            setSelectedVaccine("");

            console.log("Data sent status", response.status);

            //Refresh page
            fetchPatients();
        } catch (error) {
            console.error("Failed to add patient [AddPatientModal.tsx file]", error)
        }
    }

    return (
        <>
            <button type="button" className="btn btn-primary add-patient-btn" data-bs-toggle="modal" data-bs-target="#addPatientModal">
                <Icon icon="zondicons:add-solid" /> Patients
            </button>

            <div className="modal fade" id="addPatientModal" tabIndex={-1} aria-labelledby="addPatientModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="addPatientModalLabel">New Patient</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                            <form onSubmit={handleSubmit} >
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="patient-first-name" placeholder="Patient First Name" value={patientFirstName} onChange={(e) => setPatientFirstName(e.target.value)} required />
                                    <label htmlFor="patient-first-name" className="col-form-label floatingInput">Patient First Name</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="patient-last-name" placeholder="Patient Name" value={patientLastName} onChange={(e) => setPatientLastName(e.target.value)} required />
                                    <label htmlFor="patient-last-name" className="col-form-label floatingInput">Patient Last Name</label>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="vaccine-select" className="col-form-label"> Select Vaccine: </label>
                                    <select className="form-select" id="vaccine-select" value={selectedVaccine} onChange={(e) => setSelectedVaccine(e.target.value)} required >
                                        <option>--Select--</option>
                                        {vaccines.map((vaccine) => (
                                            <option key={vaccine.id} value={vaccine.name}>
                                                {vaccine.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Add Patient</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddPatientModal;