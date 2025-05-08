import { useLocation } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import AddVaccineModal from "./AddVaccineModal";
import AddDosesModal from "./AddDosesModal";
import FindVaccineModal from "./FindVaccineModal";
import AddPatientModal from "./AddPatientModal";
import FindPatientModal from "./FindPatientModal";
import FetchedPatientsTable from "./FetchedPatientsTable";
import FetchedVaccinesTable from "./FetchedVaccinesTable";
import { Icon } from "@iconify/react/dist/iconify.js";


const HealthRecords = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const {vaccines, fetchVaccines, patients, fetchPatients, loading} = useFetchData();

    const vaccineButtons = [
        <AddVaccineModal key="addVacineModal" onVaccineAdded={fetchVaccines}/>,
        <AddDosesModal key="addDoseModal" fetchVaccines={fetchVaccines} vaccines={vaccines}/>,
        <FindVaccineModal key="findVaccineModal" onVaccineFound={(vaccine) => console.log("[HealthRecords.tsx file",vaccine)}/>
    ];

    const patientButton = [
        <AddPatientModal key="addPatientModal" fetchPatients={fetchPatients} vaccines={vaccines}/>,
        <FindPatientModal key="findPatientModal" onPatientFound={(patient) => console.log("[HealthRecords.tsx file]", patient)}/>
    ];

    return(
        <div className="health-records-wrapper">
            <div className="health-records-inner">
                <div className="widget-buttons">
                    {currentPath === "/covid-project/patients" ?  patientButton  : vaccineButtons}
                </div>

                <div className="patient-vaccine-table">
                    {loading ? (
                        <div className="loading-container">
                            <Icon className="loading" icon="svg-spinners:blocks-wave" />
                        </div>
                    ) : currentPath === "/covid-project/patients" ? (
                        <FetchedPatientsTable fetchPatients={fetchPatients} patients={patients} />
                    ) : (
                        <FetchedVaccinesTable vaccines={vaccines} fetchVaccines={fetchVaccines} />
                    )}
                </div>

            </div>
        </div>
    );
}

export default HealthRecords;