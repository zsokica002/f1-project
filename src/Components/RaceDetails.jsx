import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Loader from "./Loader";

export default function RaceDetails() {

    const [qualis, setQualis] = useState([]);
    const [loading, setLoading] = useState(true);
    const [raceResults, setRaceResults] = useState([]);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getQualis();
        getRaceResults();
    }, [])

    const getQualis = async () => {
        const url = `https://api.jolpi.ca/ergast/f1/2025/${params.id}/qualifying.json`;
        const response = await axios.get(url);
        setQualis(response.data.MRData.RaceTable.Races[0].QualifyingResults);
        // console.log(response.data.MRData.RaceTable.Races[0].QualifyingResults);
        setLoading(false);
    }

    const getRaceResults = async () => {
        const url = `https://api.jolpi.ca/ergast/f1/2025/${params.id}/results.json`;
        const response = await axios.get(url);
        setRaceResults(response.data.MRData.RaceTable.Races[0].Results);
        console.log(response.data.MRData.RaceTable.Races[0].Results);
    }

    const getBestTime = (q1, q2, q3) => {
        // console.log(q1, q2, q3);
        const bestTime = [];
        bestTime.push(q1, q2, q3);
        // console.log(bestTime);
        bestTime.sort();
        return (bestTime[0] === undefined || bestTime[0] === "" ? "DNQ" : bestTime[0]);
    };

    if (loading) {
        return <Loader />
    }

    return (
        <>

            <h3>Hello from RaceResults component!</h3>

            <table>
                <thead>
                    <tr>
                        <th colSpan={4}>Qualifying Results</th>
                    </tr>
                    <tr>
                        <th>Pos</th>
                        <th>Driver</th>
                        <th>Team</th>
                        <th>Best Time</th>
                    </tr>
                </thead>
                <tbody>

                    {qualis.map((quali, i) => {
                        return (
                            <tr key={i}>
                                <td>{quali.position}</td>
                                <td>{quali.Driver.familyName}</td>
                                <td>{quali.Constructor.name}</td>
                                <td>{getBestTime(quali.Q1, quali.Q2, quali.Q3)}</td>
                            </tr>
                        );
                    })}

                </tbody>
            </table>

            <table>
                <thead>
                    <tr>
                        <th colSpan={4}>Race Results</th>
                    </tr>
                    <tr>
                        <th>Pos</th>
                        <th>Driver</th>
                        <th>Team</th>
                        <th>Result</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>

                    {raceResults.map((result, i) => {
                        return (
                            <tr key={i}>
                                <td>{result.position}</td>
                                <td>{result.Driver.familyName}</td>
                                <td>{result.Constructor.name}</td>
                                <td>{result.Time.time}</td>
                                <td>{result.points}</td>
                            </tr>
                        );
                    })}

                </tbody>
            </table>






        </>
    );
}
