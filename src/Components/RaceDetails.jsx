import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Loader from "./Loader";
import Flag from "react-flagkit";
import { getFlagByNationality, getFlagByRaceLocation } from "../helpers/getFlags";
import Breadcrumbs from "./Breadcrumbs";

export default function RaceDetails(props) {

    const [qualis, setQualis] = useState([]);
    const [loading, setLoading] = useState(true);
    const [raceResults, setRaceResults] = useState([]);
    const [raceDetails, setRaceDetails] = useState("");

    const params = useParams();
    const navigate = useNavigate();

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

    const handleClickDriver = (id) => {
        navigate(`/driverDetails/${id}`);
    }

    const handleClickDetails = (id) => {
        navigate(`/teamDetails/${id}`);
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

    const breadcrumbs = [
        {
            label: "Races",
            route: "/races"
        },
        {
            label: raceDetails.raceName,
            route: ""
        }
    ];

    console.log(raceDetails);

    return (
        <>

            <Breadcrumbs items={breadcrumbs} />

            {/* <h3>Hello from RaceResults component!</h3> */}

            <div>
                <Flag country={getFlagByRaceLocation(props.flags, raceDetails.Circuit.Location.country)} />
                <p>{raceDetails.raceName}</p>
                <p>Country: {raceDetails.Circuit.Location.country}</p>
                <p>Location: {raceDetails.Circuit.Location.locality}</p>
                <p>date: {raceDetails.date}</p>
                <p>Full report: <a target="_blank" href={raceDetails.url}>ikonica!!!</a></p>
            </div>


            <table className="table">
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
                                <td onClick={() => handleClickDriver(quali.Driver.driverId)}
                                > <Flag country={getFlagByNationality(props.flags, quali.Driver.nationality)} />{quali.Driver.familyName}</td>
                                <td onClick={() => handleClickDetails(quali.Constructor.constructorId)}
                                >{quali.Constructor.name}</td>
                                <td>{getBestTime(quali.Q1, quali.Q2, quali.Q3)}</td>
                            </tr>
                        );
                    })}

                </tbody>
            </table>

            <table className="table">
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
                                <td> <Flag country={getFlagByNationality(props.flags, result.Driver.nationality)} />{result.Driver.familyName}</td>
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
