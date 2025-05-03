import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";


interface UserPicks{
    pcCase : PcCase;
    storageDrive: StorageDrive;
    memoryRam: Ram;
    monitor: Monitor
    motherboard: Motherboard;
    cpu: Cpu;
    gpu: Gpu;
    psu: Psu;

    caseId : number;
    motherboardId : number;
    cpuId : number;
    memoryId : number;
    storageId : number;
    monitorId : number;
    gpuId : number;
    psuId : number;
}

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

interface StorageDrive{
    id: number;
    name: string;
    brand: string;
    partNumber: string;
    price: number;
    storageType: string;
    capacity: string;
    stock: number; 
}

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

const userPicksURL = import.meta.env.VITE_USER_PICKS_URL;
const updateCpuURL = import.meta.env.VITE_UPDATE_CPU_URL;
const updateMotherboardURL = import.meta.env.VITE_UPDATE_MOTHERBOARD_URL;
const updateMemoryURL = import.meta.env.VITE_UPDATE_MEMORY_URL;
const updateStorageURL = import.meta.env.VITE_UPDATE_STORAGE_URL;
const updateGpuURL = import.meta.env.VITE_UPDATE_GPU_URL;
const updateCaseURL = import.meta.env.VITE_UPDATE_CASE_URL;
const updatePsuURL = import.meta.env.VITE_UPDATE_PSU_URL;
const updateMonitorURL = import.meta.env.VITE_UPDATE_MONITOR_URL;



const UserPicks = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [picks, setPicks] = useState<UserPicks | null>(null);

    //Fetching the User picks
    const fetchUserPicks = async () => {
        try {
            const response = await axios.get(userPicksURL);
            if(response){
                console.log(response.data);
                setPicks(response.data);
            } 
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() =>{
        fetchUserPicks();
        window.scrollTo(0,0);
    }, [location])

    const calculatePrice = (picks : UserPicks | null) => {
        if(!picks) return 0

        const prices = [
            picks.cpu?.price,
            picks.gpu?.price,
            picks.psu?.price,
            picks.pcCase?.price,
            picks.monitor?.price,
            picks.memoryRam?.price,
            picks.motherboard?.price,
            picks.storageDrive?.price
        ];

        let sum = 0;
        for(let i = 0; i < prices.length; i++){
            if(prices[i]) sum += prices[i];
        }

        return sum;

    }

    const handlePcUpdate = async (url : string) => {
        const updateVal = import.meta.env.VITE_UPDATE_VALUE;
        const fullUrl = url + updateVal;
        try {
            const response = await axios.put(fullUrl)
            console.log("Updated list", response);
            navigate("/pcpartpicker");
        } catch (error) {
            console.error(`Failed to update data for this endpoint ${url}`, error);
        }
    }

    return (
        <div>
            <h1 className="title">Choose Your Parts</h1>
            <div className="user-picks-container container">
                {picks ? (
                    <>
                        
                        <table className="table user-picks-table">
                            <thead className="table-secondary">
                                <tr>
                                    <th>Component</th>
                                    <th>Selection</th>
                                    <th>Price</th>
                                    <th colSpan={2}>Stock</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td data-label="Component:">CPU</td>
                                    {picks?.cpuId == 0 || !picks.cpu? (
                                        <td colSpan={4} data-label="Selection:">
                                            <Link to="/pcpartpicker/cpu">
                                                <button className="btn btn-primary">
                                                    <Icon icon="zondicons:add-solid" /> Select Item
                                                </button>
                                            </Link>
                                        </td>
                                    ) :
                                        (
                                            <>
                                                <td data-label="Selection:">{picks?.cpu.name}</td>
                                                <td data-label="Price">${picks?.cpu.price}</td>
                                                <td data-label="Stock">{picks?.cpu.stock}</td>
                                                <td data-label=""> <button className="btn btn-close" onClick={() => handlePcUpdate(updateCpuURL)}></button></td>
                                            </>
                                        )}
                                </tr>
                                <tr>
                                    <td data-label="Component:">Motherboard</td>
                                    {picks?.motherboardId == 0 || !picks.motherboard? (
                                        <td colSpan={4} data-label="Selection:">
                                            <Link to="/pcpartpicker/motherboard">
                                                <button className="btn btn-primary">
                                                    <Icon icon="zondicons:add-solid" /> Select Item
                                                </button>
                                            </Link>
                                        </td>
                                    ) :
                                        (
                                            <>
                                                <td data-label="Selection:">{picks?.motherboard.name}</td>
                                                <td data-label="Price">${picks?.motherboard.price}</td>
                                                <td data-label="Stock">{picks?.motherboard.stock}</td>
                                                <td data-label=""> <button className="btn btn-close" onClick={() => handlePcUpdate(updateMotherboardURL)}></button></td>
                                            </>
                                        )}
                                </tr>
                                <tr>
                                    <td data-label="Component:">Memory</td>
                                    {picks?.memoryId == 0 || !picks.memoryRam? (
                                        <td colSpan={4} data-label="Selection:">
                                            <Link to="/pcpartpicker/memory">
                                                <button className="btn btn-primary">
                                                    <Icon icon="zondicons:add-solid" /> Select Item
                                                </button>
                                            </Link>
                                        </td>
                                    ) :
                                        (
                                            <>
                                                <td data-label="Selection:">{picks?.memoryRam.name}</td>
                                                <td data-label="Price">${picks?.memoryRam.price}</td>
                                                <td data-label="Stock">{picks?.memoryRam.stock}</td>
                                                <td data-label=""> <button className="btn btn-close" onClick={() => handlePcUpdate(updateMemoryURL)}></button></td>
                                            </>
                                        )}
                                </tr>
                                <tr>
                                    <td data-label="Component:">Storage</td>
                                    {picks?.storageId == 0 || !picks.storageDrive? (
                                        <td colSpan={4} data-label="Selection:">
                                            <Link to="/pcpartpicker/storage">
                                                <button className="btn btn-primary">
                                                    <Icon icon="zondicons:add-solid" /> Select Item
                                                </button>
                                            </Link>
                                        </td>
                                    ) :
                                        (
                                            <>
                                                <td data-label="Selection:">{picks?.storageDrive.name}</td>
                                                <td data-label="Price">${picks?.storageDrive.price}</td>
                                                <td data-label="Stock">{picks?.storageDrive.stock}</td>
                                                <td data-label=""> <button className="btn btn-close" onClick={() => handlePcUpdate(updateStorageURL)}></button></td>
                                            </>
                                        )}
                                </tr>
                                <tr>
                                    <td data-label="Component:">Graphics Card</td>
                                    {picks?.gpuId == 0 || !picks.gpu? (
                                        <td colSpan={4} data-label="Selection:">
                                            <Link to="/pcpartpicker/gpu">
                                                <button className="btn btn-primary">
                                                    <Icon icon="zondicons:add-solid" /> Select Item
                                                </button>
                                            </Link>
                                        </td>
                                    ) :
                                        (
                                            <>
                                                <td data-label="Selection:">{picks?.gpu.name}</td>
                                                <td data-label="Price">${picks?.gpu.price}</td>
                                                <td data-label="Stock">{picks?.gpu.stock}</td>
                                                <td data-label=""> <button className="btn btn-close" onClick={() => handlePcUpdate(updateGpuURL)}></button></td>
                                            </>
                                        )}
                                </tr>
                                <tr>
                                    <td data-label="Component:">Case</td>
                                    {picks?.caseId == 0 || !picks.pcCase? (
                                        <td colSpan={4} data-label="Selection:">
                                            <Link to="/pcpartpicker/case">
                                                <button className="btn btn-primary">
                                                    <Icon icon="zondicons:add-solid" /> Select Item
                                                </button>
                                            </Link>
                                        </td>
                                    ) :
                                        (
                                            <>
                                                <td data-label="Selection:">{picks?.pcCase.name}</td>
                                                <td data-label="Price">${picks?.pcCase.price}</td>
                                                <td data-label="Stock">{picks?.pcCase.stock}</td>
                                                <td data-label=""> <button className="btn btn-close" onClick={() => handlePcUpdate(updateCaseURL)}></button></td>
                                            </>
                                        )}
                                </tr>
                                <tr>
                                    <td data-label="Component:">Power Supply</td>
                                    {picks?.psuId == 0 || !picks.psu? (
                                        <td colSpan={4} data-label="Selection:">
                                            <Link to="/pcpartpicker/psu">
                                                <button className="btn btn-primary">
                                                    <Icon icon="zondicons:add-solid" /> Select Item
                                                </button>
                                            </Link>
                                        </td>
                                    ) :
                                        (
                                            <>
                                                <td data-label="Selection:">{picks?.psu.name}</td>
                                                <td data-label="Price">${picks?.psu.price}</td>
                                                <td data-label="Stock">{picks?.psu.stock}</td>
                                                <td data-label=""> <button className="btn btn-close" onClick={() => handlePcUpdate(updatePsuURL)}></button></td>
                                            </>
                                        )}
                                </tr>
                                <tr>
                                    <td data-label="Component:">Monitor</td>
                                    {picks?.monitorId == 0 || !picks.monitor? (
                                        <td colSpan={4} data-label="Selection:">
                                            <Link to="/pcpartpicker/monitor">
                                                <button className="btn btn-primary">
                                                    <Icon icon="zondicons:add-solid" /> Select Item
                                                </button>
                                            </Link>
                                        </td>
                                    ) :
                                        (
                                            <>
                                                <td data-label="Selection:">{picks?.monitor.name}</td>
                                                <td data-label="Price">${picks?.monitor.price}</td>
                                                <td data-label="Stock">{picks?.monitor.stock}</td>
                                                <td data-label=""> <button className="btn btn-close" onClick={() => handlePcUpdate(updateMonitorURL)}></button></td>
                                            </>
                                        )}
                                </tr>
                                <tr>
                                    <td colSpan={2} style={{textAlign: "end"}}>Total:</td>
                                    <td colSpan={3}>${calculatePrice(picks).toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </>
                ) : (
                    <div className="loading-container">
                        <Icon className="loading" icon="svg-spinners:blocks-wave" />
                    </div>
                )}

                
                
            </div>
        </div>
    )
}

export default UserPicks;