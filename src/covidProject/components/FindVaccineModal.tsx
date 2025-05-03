import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import { useState } from "react";

interface Vaccine {
    id: number;
    name: string;
    dosesReceived: number;
    dosesRemaining: number;
    doseIntervals: number;
    dosesRequired: number;
}

interface FindVaccineModalProps {
    onVaccineFound: (vaccine: Vaccine) => void;
}

const FindVaccineModal = ({ onVaccineFound }: FindVaccineModalProps) => {
    const [searchId, setSearchId] = useState("");
    const [searchResult, setSearchResult] = useState<Vaccine | null>(null);
    const [showModal, setShowModal] = useState(false);



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!searchId || isNaN(Number(searchId))) {
            alert("Invalid ID");
            return;
        }

        const findVaccineByIdURL = `${import.meta.env.VITE_FIND_VACCINE_BY_ID_URL}${searchId}`
        try {
            const response = await axios.get(findVaccineByIdURL);
            if (response.data) {
                setSearchResult(response.data);
                onVaccineFound(response.data);
                setShowModal(true);
            } else {
                alert("Vaccine not found");
            }

        } catch (error) {
            alert("Patient not found");
            console.error("Error Fetching vaccine by ID [FindVaccineModal.tsx file]", error);
        }
    }

    return (
        <>
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
                <div className="input-group">
                    <input
                        className="form-control"
                        type="search"
                        placeholder="Vaccine ID"
                        aria-label="Search"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                    />
                    <button className="btn btn-primary" type="submit">
                        <Icon icon="ic:baseline-search" />
                    </button>
                </div>
            </form>

            <div
                className={`modal fade ${showModal ? "show" : ""}`}
                tabIndex={-1}
                role="dialog"
                style={{ display: showModal ? "block" : "none" }}
                aria-labelledby="findVaccineModalLabel"
                aria-hidden={!showModal}
            >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="findVaccineModalLabel">
                                Vaccine Information
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                                onClick={() => setShowModal(false)}
                            ></button>
                        </div>
                        <div className="modal-body">
                            {searchResult && (
                                <>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="floatingPlaintextInputID"
                                            placeholder={`${searchResult.id}`}
                                            name="id"
                                            value={`${searchResult.id}`}
                                            readOnly
                                        />
                                        <label htmlFor="floatingPlaintextInputID">ID</label>
                                    </div>

                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="floatingPlaintextInputName"
                                            placeholder={`${searchResult.name}`}
                                            name="name"
                                            value={`${searchResult.name}`}
                                            readOnly
                                        />
                                        <label htmlFor="floatingPlaintextInputNam">Name</label>
                                    </div>

                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="floatingPlaintextInputIntervals"
                                            placeholder={`${searchResult.doseIntervals}`}
                                            name="intervals"
                                            value={`${searchResult.doseIntervals}`}
                                            readOnly
                                        />
                                        <label htmlFor="floatingPlaintextInputIntervals">
                                            Dose Intervals
                                        </label>
                                    </div>

                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="floatingPlaintextInputReceived"
                                            placeholder={`${searchResult.dosesReceived}`}
                                            name="received"
                                            value={`${searchResult.dosesReceived}`}
                                            readOnly
                                        />
                                        <label htmlFor="floatingPlaintextInputReceived">
                                            Doses Received
                                        </label>
                                    </div>

                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="floatingPlaintextInputRemaining"
                                            placeholder={`${searchResult.dosesRemaining}`}
                                            name="remaining"
                                            value={`${searchResult.dosesRemaining}`}
                                            readOnly
                                        />
                                        <label htmlFor="floatingPlaintextInputRemaining">
                                            Doses Remaining
                                        </label>
                                    </div>

                                    <label className="col-form-label">Doses Required:</label>
                                    <div className="mb-3">
                                        <div className="form-check form-check-inline">
                                            <input
                                                checked={true}
                                                type="radio"
                                                className="form-check-input"
                                                id="required"
                                                name="dosesRequired"
                                                value={searchResult.dosesRequired}
                                                readOnly
                                            />
                                            <label htmlFor="required">{searchResult.dosesRequired}</label>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setShowModal(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && <div className="modal-backdrop fade show"></div>}
        </>
    );

}

export default FindVaccineModal;