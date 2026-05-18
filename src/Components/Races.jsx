import { useEffect } from "react";
import Loader from "./Loader";

export default function App() {
    const [allRaces, setAllRaces] = useState();
    const [loading, setLoading] = useState();

    useEffect(() => {
        getAllRaces();

    }, []);

    const getAllRaces = async () => {
        const urs = "https://api.jolpi.ca/ergast/f1/2025/results/1.json";

        const response = await axios.get(url);
        setAllRaces(response.data);
        setLoading(false);
    }

    if (loading) {
        return <Loader />
    }


    return (
        <>
        </>
    )
}