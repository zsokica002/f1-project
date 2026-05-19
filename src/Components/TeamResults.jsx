import { useState, useEffect } from "react";
import Loader from "./Loader";
import axios from "axios";
import { useParams } from "react-router";

export default function TeamResults() {

    const [teamResults, setTeamResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [year, setYear] = useState("");

    const params = useParams();
    // console.log("params ", params);


    useEffect(() => {
        getTeamResults();
    }, []);

    const getTeamResults = async () => {
        const url = `https://api.jolpi.ca/ergast/f1/2025/constructors/${params.id}/results.json`;

        const response = await axios.get(url);
        console.log(response);
        setTeamResults(response.data.MRData.RaceTable.Races);
        setYear(response.data.MRData.RaceTable.season);

        setLoading(false);
    };

    console.log(teamResults);




    if (loading) {
        return <Loader />;
    }

    return (

        <div>
            <h1>{teamResults[0].Results[0].Constructor.name} results</h1>

            <div>
                <p>{teamResults[0].Results[0].Constructor.name}</p>
                <p>{teamResults[0].Results[0].Constructor.nationality}</p>

            </div>

            <table>
                <thead>
                    <tr>
                        <th colSpan={5}>Formula 1 {year} Results</th>
                    </tr>
                    <tr>
                        <th>Round</th>
                        <th>Grand Prix</th>
                        <th>{teamResults[0].Results[0].Driver.familyName}</th>
                        <th>{teamResults[0].Results[1].Driver.familyName}</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {teamResults.map((race) => (
                        <tr key={race.round}>

                            <td>{race.round}</td>
                            <td>{race.raceName}</td>
                            <td>{race.Results[0].position}</td>
                            <td>{race.Results[1].position}</td>
                            <td>{Number(race.Results[0].points) + Number(race.Results[1].points)}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>



    );

}