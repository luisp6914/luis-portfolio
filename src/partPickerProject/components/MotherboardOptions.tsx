import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface Motherboard{
    id: number;
    name: string;
    brand: string;
    partNumber: string;
    price: number;
    socket: string;
    formFactor: string;
    pins: string;
    storageType: string;
    stock: number;
}

const MotherboardOptions = () => {
    const navigate = useNavigate();
    const [motherboardList, setMotherboardList] = useState<Motherboard[] | null>(null);

    const fetchMotherboardList = async () => {
        const motherboardListURL = import.meta.env.VITE_ALL_MOTHERBOARDS_URL;
        try {
            const response = await axios.get(motherboardListURL);
            console.log(response.data);
            setMotherboardList(response.data);
        } catch (error) {
            console.error("Error getting Cpu List: ", error);
        }
    }

    useEffect(() => {
        fetchMotherboardList();
    }, [])

    const handleAddMotherboard = async (id : number) => {
        const addMotherboardURL = `${import.meta.env.VITE_ADD_MOTHERBOARD_URL}${id}`;
        try {
            const response = await axios.put(addMotherboardURL);
            console.log("Add motherboard response:", response);
            navigate("/pcpartpicker")
        } catch (error) {
            console.error("Failed to add motherboard:", error)
        }

    }

    return (
        <div>
            <h1 className="title">Motherboard Options</h1>
            <div className="container motherboard-options">
                {motherboardList ? (
                    <div>
                        
                        <table className="table">
                            <thead className="table-secondary">
                                <tr>
                                    <th>Name</th>
                                    <th>CPU Socket</th>
                                    <th>Form Factor</th>
                                    <th>Pins</th>
                                    <th>Socket</th>
                                    <th>Brand</th>
                                    <th>Part Number</th>
                                    <th>Price</th>
                                    <th colSpan={2}>Stock</th>
                                </tr>
                            </thead>
                            <tbody>
                                {motherboardList.map(motherboard => (
                                    <tr key={motherboard.id}>
                                        <td data-label="Name:">{motherboard.name}</td>
                                        <td data-label="CPU Socket:">{motherboard.socket}</td>
                                        <td data-label="Form Factor:">{motherboard.formFactor}</td>
                                        <td data-label="Pins:">{motherboard.pins}</td>
                                        <td data-label="Socket:">{motherboard.socket}</td>
                                        <td data-label="Brand:">{motherboard.brand}</td>
                                        <td data-label="Part Number:">{motherboard.partNumber}</td>
                                        <td data-label="Price:">{motherboard.price}</td>
                                        <td data-label="Stock:">{motherboard.stock}</td>
                                        <td>
                                            {motherboard.stock == 0 ? (
                                                <button className="btn btn-primary" disabled>
                                                    <Icon icon="tdesign:cart-add" width="24" height="24" />
                                                </button>
                                            ) : (
                                                <Link to="/pcpartpicker">
                                                    <button className="btn btn-primary" onClick={() => handleAddMotherboard(motherboard.id)}>
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

export default MotherboardOptions