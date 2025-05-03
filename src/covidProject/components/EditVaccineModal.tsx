import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import { useState } from "react";

interface EditVaccineModalProps {
    vaccine: {
        id: number;
        name: string;
        doseIntervals: number;
    };
    onUpdate: () => void
}

const EditVaccineModal = ({ vaccine, onUpdate }: EditVaccineModalProps) => {
    const [name, setName] = useState(vaccine.name);
    const [doseIntervals, setDoseIntervals] = useState(vaccine.doseIntervals);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const doseIntervalsNum = Number(doseIntervals);
        //Checking that doseIntervals is a valid number
        if (isNaN(doseIntervalsNum) || doseIntervalsNum < 0) {
            alert("Please enter a valid non-negative numeric value for Dose Intervals");
            return;
        }

        const data = {
            name,
            doseIntervals: doseIntervalsNum
        }

        try {
            const editVaccineURL = `${import.meta.env.VITE_EDIT_VACCINE_URL}${vaccine.id}`
            console.log(vaccine.id);
            console.log(data);
            const response = await axios.put(editVaccineURL, data,{
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log("Edit vaccine status", response.status)
            onUpdate();
        } catch (error) {
            console.error("Failed to update vaccine [EditVaccineModal.tsx file", error)
        }

    }

    return (
        <>
            <button type="button" className="btn btn-secondary edit-btn" data-bs-toggle="modal" data-bs-target={`#editVaccineModal${vaccine.id}`}>
                <Icon icon="mage:edit" /> Edit
            </button>

            <div className="modal fade" id={`editVaccineModal${vaccine.id}`} tabIndex={-1} aria-labelledby={`editVaccineModalLabel${vaccine.id}`} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    {/*The container of the modal */}
                    <div className="modal-content">
                        <div className="modal-header">
                            {/*The header of the modal */}
                            <h1 className="modal-title fs-5" id={`editVaccineModalLabel${vaccine.id}`}>Edit Vaccine</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                        </div>
                        {/*The body of the modal, this case the form */}
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                {/*The floating label for vaccine name */}
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id={`vaccineName${vaccine.id}`} placeholder="Vaccine Name" value={name} onChange={(e) => setName(e.target.value)} required />
                                    <label htmlFor={`vaccineName${vaccine.id}`} className="col-form-label floatingInput">Vaccine Name</label>
                                </div>
                                {/*The floating label for vaccine name */}
                                <div className="form-floating mb-3">
                                    <input type="number" className="form-control" id={`doseIntervals${vaccine.id}`} placeholder="Dose Interval" value={doseIntervals === null ? 0 : doseIntervals} onChange={(e) => setDoseIntervals(parseInt(e.target.value))} readOnly={doseIntervals === null ? true : false} required />
                                    <label htmlFor={`doseIntervals${vaccine.id}`} className="col-form-label floatingInput">Dose Intervals</label>
                                </div>
                                {/*Footer of the modal*/}
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Edit Vaccine</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditVaccineModal;