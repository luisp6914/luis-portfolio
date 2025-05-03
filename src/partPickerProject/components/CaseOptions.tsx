import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface PcCase {
    id: number;
    name: string;
    brand: string; 
    partNumber: string;
    caseType: string;
    color: string;
    price: number;
    stock: number;
    maxGpuLength: number;
    maxCoolerHeight: number; 
    maxPsuLength: number;
}

const CaseOptions = () => {
    const navigate = useNavigate();
    const [caseList, setCaseList] = useState<PcCase[] | null>(null);

    const fetchCaseList = async () => {
        const caseListURL = import.meta.env.VITE_ALL_CASES_URL;
        try {
            const response = await axios.get(caseListURL);
            console.log(response.data);
            setCaseList(response.data);
        } catch (error) {
            console.error("Error getting PcCase List: ", error);
        }
    }

    useEffect(() => {
        fetchCaseList();
    }, [])

    const handleAddPcCase = async (id : number) => {
        const addCaseURL = import.meta.env.VITE_ADD_CASE_URL;
        const addPcCaseURL = `${addCaseURL}${id}`;

        try {
            const response = await axios.put(addPcCaseURL, null, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log("Adding PC case response: ", response);
            navigate("/pcpartpicker");
        } catch (error) {
            console.error("Failed to add PC Case", error)
        }
    }

    return (
        <div>
            <h1 className="title">CPU Options</h1>
            <div className="container case-options">
                {caseList ? (
                    <div>
                        <table className="table">
                            <thead className="table-secondary">
                                <tr>
                                    <th>Name</th>
                                    <th>Case Type</th>
                                    <th>Color</th>
                                    <th>Brand</th>
                                    <th>Part Number</th>
                                    <th>Price</th>
                                    <th colSpan={2}>Stock</th>
            
                                </tr>
                            </thead>
                            <tbody>
                                {caseList.map((pcCase) => (
                                    <tr key={pcCase.id}>
                                        <td data-label="Name:">{pcCase.name}</td>
                                        <td data-label="Case Type:">{pcCase.caseType}</td>
                                        <td data-label="Color:">{pcCase.color}</td>
                                        <td data-label="Brand:">{pcCase.brand}</td>
                                        <td data-label="Part Number:">{pcCase.partNumber}</td>
                                        <td data-label="Price:">{pcCase.price}</td>
                                        <td data-label="Stock:">{pcCase.stock}</td>
                                        <td>
                                            {pcCase.stock == 0 ? (
                                                <button className="btn btn-primary" disabled>
                                                    <Icon icon="tdesign:cart-add" width="24" height="24" />
                                                </button>
                                            ) : (
                                                <button className="btn btn-primary" onClick={() => handleAddPcCase(pcCase.id)} >
                                                    <Icon icon="tdesign:cart-add" width="24" height="24" />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="loading-container">
                        <Icon className="loading" icon="svg-spinners:blocks-wave" />
                    </div>
                )}
            
            </div>
        </div>
    )
}

export default CaseOptions