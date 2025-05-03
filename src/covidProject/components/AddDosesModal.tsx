import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import { useState } from "react";


interface Vaccine {
    id: number;
    name: string;
}

interface AddDosesModalProps {
    fetchVaccines: () => void;
    vaccines: Vaccine[];
}

const AddDosesModal = ({ fetchVaccines, vaccines }: AddDosesModalProps) => {
    

    const [selectedVaccine, setSelectedVaccine] = useState("");
    const [dosesNums, setDosesNums] = useState("");

    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const doses = Number(dosesNums);
        if (isNaN(doses) || doses < 0) {
            alert("Please enter a valid non-negative numeric value for doses.");
            return;
        }

        const data = {
            doses
        }

        try {
            const addDosesURL = `${import.meta.env.VITE_ADD_DOSES_URL}${selectedVaccine}`
            const response = await axios.post(addDosesURL, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setSelectedVaccine("");
            setDosesNums("");
            console.log("Data sent status", response.status)
            //Refresh page
            fetchVaccines();
        } catch (error) {
            console.error("Failed to add doses [AddDosesModal.tsx]", error);
        }
    }

    return (
        <>
            <button type="button" className="btn add-dose-btn" data-bs-toggle="modal" data-bs-target="#addDosesModal" style={{ background: "orange", color: "#fff" }}>
                <Icon icon="zondicons:add-solid" /> Dose
            </button>

            <div className="modal fade" id="addDosesModal" tabIndex={-1} aria-labelledby="addDosesModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    {/*The container of the modal */}
                    <div className="modal-content">
                        {/*The header of the modal */}
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="addDosesModalLabel">Add Dose</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        {/*The body of the modal, this case the form */}
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                {/*Label for selecting vaccine*/}
                                <div className="mb-3">
                                    <label htmlFor="vaccine-select" className="col-form-label"> Select Vaccine: </label>
                                    <select className="form-select" id="vaccine-select" value={selectedVaccine} onChange={(e) => setSelectedVaccine(e.target.value)} required >
                                        <option >--Select--</option>
                                        {vaccines.map((vaccine) => (
                                            <option key={vaccine.id} value={vaccine.id}>
                                                {vaccine.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {/*Label for getting Doses from user*/}
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="doses" placeholder="Add Doses" value={dosesNums} onChange={(e) => setDosesNums(e.target.value)} required />
                                    <label htmlFor="doses" className="col-form-label floatingInput">Add Doses</label>
                                </div>
                                {/*Footer of the modal*/}
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Add Doses</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default AddDosesModal;

