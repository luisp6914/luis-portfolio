import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface Monitor{
    id: number;
    name: string;
    brand: string;
    partNumber: string;
    price: number;
    screenSize: string;
    resolution: string;
    stock: number;
}

const MonitorOptions = () => {
    const navigate = useNavigate();
    const [monitorList, setMonitorList] = useState<Monitor[] | null>(null);

    const fetchMonitorList = async () => {
        const monitorListURL = import.meta.env.VITE_ALL_MONITORS_URL;
        try {
            const response = await axios.get(monitorListURL);
            console.log(response.data);
            setMonitorList(response.data);
        } catch (error) {
            console.error("Error getting monitor List: ", error);
        }
    }

    useEffect(() => {
        fetchMonitorList();
    }, [])

    const handleAddMonitor = async (id : number) => {
        const addMonitorURL = `${import.meta.env.VITE_ADD_MONITOR_URL}${id}`;
        try {
            const response = await axios.put(addMonitorURL);
            console.log("Add monitor response:", response);
            navigate("/pcpartpicker");
        } catch (error) {
            console.error("Failed to add monitor:", error)
        }
    }

    return (
        <div>
            <h1 className="title">Monitor Options</h1>
            <div className="container monitor-options">
                {monitorList ? (
                    <div>
                        <table className="table">
                            <thead className="table-secondary">
                                <tr>
                                    <th>Name</th>
                                    <th>Screen Size</th>
                                    <th>Resolution</th>
                                    <th>Brand</th>
                                    <th>Part Number</th>
                                    <th>Price</th>
                                    <th colSpan={2}>Stock</th>
                                </tr>
                            </thead>
                            <tbody>
                                {monitorList.map((monitor) => (
                                    <tr key={monitor.id}>
                                        <td data-label="Name:">{monitor.name}</td>
                                        <td data-label="Screen Size:">{monitor.screenSize}</td>
                                        <td data-label="Resolution:">{monitor.resolution}</td>
                                        <td data-label="Brand:">{monitor.brand}</td>
                                        <td data-label="Part Number:">{monitor.partNumber}</td>
                                        <td data-label="Price:">{monitor.price}</td>
                                        <td data-label="Stock:">{monitor.stock}</td>
                                        <td>
                                            {monitor.stock == 0 ? (
                                                <button className="btn btn-primary" disabled>
                                                    <Icon icon="tdesign:cart-add" width="24" height="24" />
                                                </button>
                                            ) : (
                                                <Link to="/pcpartpicker">
                                                    <button className="btn btn-primary" onClick={() => handleAddMonitor(monitor.id)}>
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

export default MonitorOptions