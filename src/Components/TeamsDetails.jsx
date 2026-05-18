import { useState } from "react";
import Loader from "./Loader";
import axios from "axios";

export default function TeamsDetails() {
    const [teamsDetails, setTeamsDetails] = useState(null);
    const [loading, setLoading] = useState(true);

const params = useParams();

    useEffect(() => {
        getTeamsDetails();
    }, [])

     const getTeamsDetails = async () => {
        const url = `https://api.jolpi.ca/ergast/f1/2025/constructors/+id+/constructorStandings.json ${params.id}`;


        const response = await axios.get(url);
        console.log(response);
        setTeamsDetails(response.data);
        setLoading(false);
    };


    if (loading) {
        return <Loader />;
    }


    return (
        <div className="">
            <h2>Team details</h2>
            <p> {teamsDetails.url}  </p>
            

        </div>

    )




}