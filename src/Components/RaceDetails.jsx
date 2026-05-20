import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loader from "./Loader";

export default function RaceDetails() {

    const [qualis, setQualis] = useState([]);
    const [loading, setLoading] = useState(true);
    const [raceResults, setRaceResults] = useState([]);
    const [raceDetails, setRaceDetails] = useState("");

    const params = useParams();

    useEffect(() => {
        getRaceDetails();
    }, [])

    const getRaceDetails = async () => {
        const urlRaceDetails = `https://api.jolpi.ca/ergast/f1/2025/${params.id}/results/1.json`;
        const urlQualis = `https://api.jolpi.ca/ergast/f1/2025/${params.id}/qualifying.json`;
        const urlRaceResults = `https://api.jolpi.ca/ergast/f1/2025/${params.id}/results.json`;

        const responseRaceDetails = await axios.get(urlRaceDetails);
        // console.log(responseRaceDetails.data.MRData.RaceTable.Races);
        const responseQualis = await axios.get(urlQualis);
        // console.log(responseQualis.data.MRData.RaceTable.Races[0].QualifyingResults);
        const responseRaceResults = await axios.get(urlRaceResults);
        // console.log(responseRaceResults.data.MRData.RaceTable.Races[0].Results);

        setQualis(responseQualis.data.MRData.RaceTable.Races[0].QualifyingResults);
        setRaceResults(responseRaceResults.data.MRData.RaceTable.Races[0].Results);
        setRaceDetails(responseRaceDetails.data.MRData.RaceTable.Races[0]);

        setLoading(false);
    };


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
    };

    console.log(raceDetails);

    return (
        <>

            {/* <h3>Hello from RaceResults component!</h3> */}

            <div>
                <p>ovde ide zastavica!</p>
                <p>Country: {raceDetails.Circuit.Location.country}</p>
                <p>Location: {raceDetails.Circuit.Location.locality}</p>
                <p>date: {raceDetails.date}</p>
                <p>Full report: <a target="_blank" href={raceDetails.url}>ikonica!!!</a></p>
            </div>


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
                                <td>{result.Time ? result.Time.time : result.status}</td>
                                <td>{result.points}</td>
                            </tr>
                        );
                    })}

                </tbody>
            </table>






        </>
    );
}
