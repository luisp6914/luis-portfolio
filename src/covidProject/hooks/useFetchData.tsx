import axios from "axios";
import { useEffect, useState } from "react"

const useFetchData = () => {
    //Fetched data 
    const [vaccines, setVaccines] = useState([]);
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    const allVaccinesURL = import.meta.env.VITE_ALL_VACCINES_URL;
    const allPatientsURL = import.meta.env.VITE_ALL_PATIENTS_URL;

    //Getting list of vaccines 
    const fetchVaccines = async () => {
        try {
            const response = await axios.get(allVaccinesURL);
            setVaccines(response.data);
        } catch (error) {
            console.error("Error getting Vaccines [useFetchData file", error)
        }
    }

    const fetchPatients = async () => {
        try {
            const response = await axios.get(allPatientsURL);
            setPatients(response.data);
        } catch (error) {
            console.error("Error fetching patients [useFetchData.tsx file]", error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await Promise.all([fetchVaccines(), fetchPatients()]);
            setLoading(false);
        };

        fetchData();
    }, []);

    return {vaccines, fetchVaccines, patients, fetchPatients, loading};
}

export default useFetchData;