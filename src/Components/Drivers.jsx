import { useEffect, useState } from "react";
import axios from axios;

export default function Drivers() {

    const [drivers, setDrivers] = useState([]);
    const [loadin, setLoading] = useState(true);
    useEffect(() => {
        getDrivers();
    }, []);

    const getDrivers = async () => {
        const url = "https://api.jolpi.ca/ergast/f1/2025/driverStandings.json"
        const results = axios.get(url);
        setDrivers(results.data);
        console.log(results.data);
        setLoading(false);
    }

    if (loadin) {
        return <Loader />
    }

    return (
        <>
        <h1>HELLo tHERE!</h1>
        </>
    );
}