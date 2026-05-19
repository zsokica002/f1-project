import { useState, useEffect } from "react";
import Loader from "./Loader";
import axios from "axios";
import { useParams } from "react-router";

export default function TeamResults() {

    const [teamResults, setTeamResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [year, setYear] = useState("");

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
        setYear(response.data.MRData.StandingsTable.season);

        setLoading(false);
    };




    if (loading) {
        return <Loader />;
    }


    return (

        <div>
            <h1>Team Results</h1>
            <table>
            <thead>
                    <tr>
                        <th colSpan={4}>Formula 1 {year} Results</th>
                    </tr>
                </thead>
              <tbody>  
            {teamResults.map((race) => (
                <tr key={race.round}>
                    <td>{race.raceName}</td>
                    <td>{race.date}</td>
                    <td> <button onClick={() => navigate("/")}>
                Back
            </button></td>
                </tr>
            ))}
</tbody>
           
            </table>
        </div>



    );

}