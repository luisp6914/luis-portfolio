import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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

const StorageOptions = () => {
    const navigate = useNavigate()
    const [storageList, setStorageList] = useState<StorageDrive[] | null>(null);

    const fetchstorageList = async () => {
        const storageListURL = import.meta.env.VITE_ALL_STORAGE_URL;
        try {
            const response = await axios.get(storageListURL);
            console.log(response.data);
            setStorageList(response.data);
        } catch (error) {
            console.error("Error getting Storage List: ", error);
        }
    }

    useEffect(() => {
        fetchstorageList();
    }, [])

    const handleAddStorage = async (id : number) => {
        const addStorageURL = `${import.meta.env.VITE_ADD_STORAGE_URL}${id}`;
        try {
            const response = await axios.put(addStorageURL);
            console.log("Response to add storage:", response)
            navigate("/pcpartpicker");
        } catch (error) {
            console.error("Failed to add storage:", error)
        }

    }

    return (
        <div>
            <h1 className="title">Storage Options</h1>
            <div className="container storage-options">
                {storageList ? (
                    <div>
                        <table className="table">
                            <thead className="table-secondary">
                                <tr>
                                    <th>Name</th>
                                    <th>Capacity</th>
                                    <th>Storage Type</th>
                                    <th>Brand</th>
                                    <th>Part Number</th>
                                    <th>Price</th>
                                    <th colSpan={2}>Stock</th>
                                </tr>
                            </thead>
                            <tbody>
                                {storageList.map(storage => (
                                    <tr key={storage.id}>
                                        <td data-label="Name:">{storage.name}</td>
                                        <td data-label="Capacity:">{storage.capacity}</td>
                                        <td data-label="Storage Type:">{storage.storageType}</td>
                                        <td data-label="Brand:">{storage.brand}</td>
                                        <td data-label="Part Number:">{storage.partNumber}</td>
                                        <td data-label="Price:">{storage.price}</td>
                                        <td data-label="Stock:">{storage.stock}</td>
                                        <td>
                                            {storage.stock == 0 ? (
                                                <button className="btn btn-primary" disabled>
                                                    <Icon icon="tdesign:cart-add" width="24" height="24" />
                                                </button>
                                            ) : (
                                                <Link to="/pcpartpicker">
                                                    <button className="btn btn-primary" onClick={() => handleAddStorage(storage.id)}>
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

export default StorageOptions