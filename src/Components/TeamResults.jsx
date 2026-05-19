import { useState, useEffect } from "react";
import Loader from "./Loader";
import axios from "axios";
import {useNavigate, useParams} from "react-router";

export default function TeamResults() {

    const [teamResults, setTeamResults] = useState([]);
    const [loading, setLoading] = useState(true);

    const params = useParams();
    console.log("params ", params);
    useEffect(() => {
        getTeamResults();
    }, []);

    const getTeamResults = async () => {
   const url = `https://api.jolpi.ca/ergast/f1/2025/constructors/${params.id}/results.json`;

    const response = await axios.get(url);
    console.log(response);
    setTeamResults(response.data.MRData.RaceTable.Races);
    setLoading(false);
};

const navigate = useNavigate();

if (loading) {
    return <Loader />;
}


    return(

        <div>
            <h1>Team Results</h1>
        {teamResults.map((race) => (
            <div key={race.round}>
                <h2>{race.raceName}</h2>
                <p>{race.date}</p>
            </div>
        ))}

        <button onClick={() => navigate("/")}>
            Back
        </button>
    </div>



    );

}