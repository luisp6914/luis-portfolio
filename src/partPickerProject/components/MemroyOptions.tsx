import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface Ram{
    id: number;
    name: string;
    brand: string;
    partNumber: string;
    price: number;
    formFactor: string;
    modules: string;
    frequency: string;
    capacity: string;
    stock: number;
}

const MemoryOptions = () => {
    const navigate = useNavigate();
    const [memoryList, setmemoryList] = useState<Ram[] | null>(null);

    const fetchMemoryList = async () => {
        const memoryListURI = import.meta.env.VITE_ALL_MEMORY_URL;
        try {
            const response = await axios.get(memoryListURI);
            console.log(response.data);
            setmemoryList(response.data);
        } catch (error) {
            console.error("Error getting Memory List: ", error);
        }
    }

    useEffect(() => {
        fetchMemoryList();
    }, [])

    const handleAddMemory = async (id : number) => {
        const addMemoryURL = `${import.meta.env.VITE_ADD_MEMORY_URL}${id}`;
        try {
            const response = await axios.put(addMemoryURL);
            console.log("Add Memory/Ram response: ", response);
            navigate("/pcpartpicker");
        } catch (error) {
            console.error("Failed to add Memory/Ram: ", error);
        }
    }

    return (
        <div>
            <h1 className="title">Memory Ram Options</h1>
            <div className="container ram-options">
                {memoryList ? (
                    <div className="container">
                        <div>
                            <table className="table">
                                <thead className="table-secondary">
                                    <tr>
                                        <th>Name</th>
                                        <th>Speed</th>
                                        <th>Modules</th>
                                        <th>Capacity</th>
                                        <th>Brand</th>
                                        <th>Part Number</th>
                                        <th>Price</th>
                                        <th colSpan={2}>Stock</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {memoryList.map(memory => (
                                        <tr key={memory.id}>
                                            <td data-label="Name:">{memory.name}</td>
                                            <td data-label="speed:">{memory.frequency}</td>
                                            <td data-label="Modules:">{memory.modules}</td>
                                            <td data-label="Capacity:">{memory.capacity}</td>
                                            <td data-label="Brand:">{memory.brand}</td>
                                            <td data-label="Part Number:">{memory.partNumber}</td>
                                            <td data-label="Price:">{memory.price}</td>
                                            <td data-label="Stocks:">{memory.stock}</td>
                                            <td>
                                                {memory.stock == 0 ? (
                                                    <button className="btn btn-primary" disabled>
                                                        <Icon icon="tdesign:cart-add" width="24" height="24" />
                                                    </button>
                                                ) : (
                                                    <Link to="/pcpartpicker">
                                                        <button className="btn btn-primary" onClick={() => handleAddMemory(memory.id)}>
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

export default MemoryOptions