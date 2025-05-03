import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface Gpu{
    id: number;
    name: string;
    brand: string;
    partNumber: string;
    price: number;
    memory: string;
    coreClock: string;
    length: number;
    requiredWattage: number;
    stock: number;
}

const GpuOptions = () => {
    const navigate = useNavigate();
    const [gpuList, setGpuList] = useState<Gpu[] | null>(null);

    const fetchGpuList = async () => {
        const gpuListURL = import.meta.env.VITE_ALL_GPU_URL;
        try {
            const response = await axios.get(gpuListURL);
            console.log(response.data);
            setGpuList(response.data);
        } catch (error) {
            console.error("Error getting Gpu List: ", error);
        }
    }

    useEffect(() => {
        fetchGpuList();
    }, [])

    const handleAddGpu = async (id : number) => {
        const addGpuUrl = `${import.meta.env.VITE_ADD_GPU_URL}${id}`;
        try {
            const response = await axios.put(addGpuUrl);
            console.log("Adding Gpu option response:", response);
            navigate("/pcpartpicker");
        } catch (error) {
            console.error("Failed to add GPU option", error)
        }
    }

    return (
        <div>
            <h1 className="title">GPU Options</h1>
            <div className="container gpu-options">
                {gpuList ? (
                    <div>
                        <table className="table">
                            <thead className="table-secondary">
                                <tr>
                                    <th>Name</th>
                                    <th>Memory</th>
                                    <th>Core Clock</th>
                                    <th>Length</th>
                                    <th>Brand</th>
                                    <th>Part Number</th>
                                    <th>Price</th>
                                    <th colSpan={2}>Stock</th>
                                </tr>
                            </thead>
                            <tbody>
                                {gpuList.map((gpu) => (
                                    <tr key={gpu.id}>
                                        <td data-label="Name:">{gpu.name}</td>
                                        <td data-label="Memory:">{gpu.memory}</td>
                                        <td data-label="Core Clock:">{gpu.coreClock}</td>
                                        <td data-label="Length:">{gpu.length}</td>
                                        <td data-label="Brand:">{gpu.brand}</td>
                                        <td data-label="Part Number:">{gpu.partNumber}</td>
                                        <td data-label="Price:">{gpu.price}</td>
                                        <td data-label="Stock:">{gpu.stock}</td>
                                        <td>
                                            {gpu.stock == 0 ? (
                                                <button className="btn btn-primary" disabled>
                                                    <Icon icon="tdesign:cart-add" width="24" height="24" />
                                                </button>
                                            ) : (
                                                <Link to="/pcpartpicker">
                                                    <button className="btn btn-primary" onClick={() => handleAddGpu(gpu.id)}>
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

export default GpuOptions