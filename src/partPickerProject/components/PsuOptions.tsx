import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface Psu{
    id: number;
    name: string;
    brand: string;
    partNumber: string;
    price: number;
    wattage: number;
    length: number;
    stock: number;
}

const PsuOptions = () => {
    const navigate = useNavigate();
    const [psuList, setPsuList] = useState<Psu[] | null>(null);

    const fetchPsuList = async () => {
        const psuListURL = import.meta.env.VITE_ALL_PSUS_URL;
        try {
            const response = await axios.get(psuListURL);
            console.log(response.data);
            setPsuList(response.data);
        } catch (error) {
            console.error("Error getting Psu List: ", error);
        }
    }

    useEffect(() => {
        fetchPsuList();
    }, [])

    const handleAddPsu = async (id : number) => {
        const addPsuURL = `${import.meta.env.VITE_ADD_PSU_URL}${id}`;
        try {
            const response = await axios.put(addPsuURL);
            console.log("Add psu response:", response);
            navigate("/pcpartpicker");
        } catch (error) {
            console.error("Failed to add PSU:", error)
        } 
    }

    return (
        <div>
            <h1 className="title">PSU Options</h1>
            <div className="container psu-options">
                {psuList ? (
                    <div>
                        <table className="table">
                            <thead className="table-secondary">
                                <tr>
                                    <th>Name</th>
                                    <th>Wattage</th>
                                    <th>Brand</th>
                                    <th>Part Number</th>
                                    <th>Price</th>
                                    <th colSpan={2}>Stock</th>
                                </tr>
                            </thead>
                            <tbody>
                                {psuList.map(psu => (
                                    <tr key={psu.id}>
                                        <td data-label="Name:">{psu.name}</td>
                                        <td data-label="Wattage:">{psu.wattage}</td>
                                        <td data-label="Brand:">{psu.brand}</td>
                                        <td data-label="Part Number:">{psu.partNumber}</td>
                                        <td data-label="Price:">{psu.price}</td>
                                        <td data-label="Stock:">{psu.stock}</td>
                                        <td>
                                            {psu.stock == 0 ? (
                                                <button className="btn btn-primary" disabled>
                                                    <Icon icon="tdesign:cart-add" width="24" height="24" />
                                                </button>
                                            ) : (
                                                <Link to="/pcpartpicker">
                                                    <button className="btn btn-primary" onClick={() => handleAddPsu(psu.id)}>
                                                        <Icon icon="tdesign:cart-add" width="24" height="24" />
                                                    </button>
                                                </Link>
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

export default PsuOptions