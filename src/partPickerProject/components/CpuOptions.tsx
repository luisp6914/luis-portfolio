import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface Cpu{
    id: number;
    name: string;
    brand: string;
    partNumber: string;
    price: number;
    coreClock: string;
    coreCount: number;
    requiredWattage: number;
    socket: string;
    stock: number;
}

const CpuOptions = () => {
    const navigate = useNavigate();
    const [cpuList, setCpuList] = useState<Cpu[] | null>(null);

    const fetchCpuList = async () => {
        const cpuListURL = import.meta.env.VITE_ALL_CPUS_URL;
        try {
            const response = await axios.get(cpuListURL);
            console.log(response.data);
            setCpuList(response.data);
        } catch (error) {
            console.error("Error getting Cpu List: ", error);
        }
    }

    useEffect(() => {
        fetchCpuList();
    }, [])

    const handleAddCpu = async (id : number) => {
        try {
            const addCpuURL = `${import.meta.env.VITE_ADD_CPU_URL}${id}`;
            const response = await axios.put(addCpuURL);
            console.log("Adding cpu option response:", response);
            navigate("/pcpartpicker");
        } catch (error) {
            console.error("Failed to update CPU option", error)
        }
    }

    return (
        <div>
            <h1 className="title">CPU Options</h1>
            <div className="container cpu-options">
                {cpuList ? (
                    <div>
                        
                        <table className="table">
                            <thead className="table-secondary">
                                <tr>
                                    <th>Name</th>
                                    <th>Core Count</th>
                                    <th>Performance Core Clock</th>
                                    <th>Socket</th>
                                    <th>Brand</th>
                                    <th>Part Number</th>
                                    <th>Price</th>
                                    <th colSpan={2}>Stock</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cpuList.map((cpu) => (
                                    <tr key={cpu.id}>
                                        <td data-label="Name:">{cpu.name}</td>
                                        <td data-label="Core Count:">{cpu.coreCount}</td>
                                        <td data-label="Performance Core Clock:">{cpu.coreClock}</td>
                                        <td data-label="Socket:">{cpu.socket}</td>
                                        <td data-label="Brand:">{cpu.brand}</td>
                                        <td data-label="Part Number:">{cpu.partNumber}</td>
                                        <td data-label="Price:">{cpu.price}</td>
                                        <td data-label="Stock:">{cpu.stock}</td>
                                        <td>
                                            {cpu.stock == 0 ? (
                                                <button className="btn btn-primary" disabled>
                                                    <Icon icon="tdesign:cart-add" width="24" height="24" />
                                                </button>
                                            ) : (
                                                <Link to="/pcpartpicker">
                                                    <button className="btn btn-primary" onClick={() => handleAddCpu(cpu.id)} value={cpu.id}>
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

export default CpuOptions