import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Loader from "./Loader";
import Flag from "react-flagkit";
import { getFlagByNationality, getFlagByRaceLocation } from "../helpers/getFlags";
import Breadcrumbs from "./Breadcrumbs";
import { ExportOutlined } from "@ant-design/icons";
import { getColor, getTopThreeClassName } from "../helpers/getColor";

export default function RaceDetails(props) {

    const [qualis, setQualis] = useState([]);
    const [loading, setLoading] = useState(true);
    const [raceResults, setRaceResults] = useState([]);
    const [raceDetails, setRaceDetails] = useState("");
    const [filteredRaceResults, setFilteredRaceResults] = useState([]);
    const [filteredQualis, setFilteredQualis] = useState([]);
    const [isError, setIsError] = useState(false);

    const year = props.year;
    const search = props.search;
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getRaceDetails();
    }, [year]);

    useEffect(() => {
        const resultRaceResults = raceResults.filter((item) => {
            return (
                item.Driver.familyName.toLowerCase().includes(search.toLowerCase()) ||
                item.Constructor.name.toLowerCase().includes(search.toLowerCase())
            );
        });

        const resultQualis = qualis.filter((item) => {
            return (
                item.Driver.familyName.toLowerCase().includes(search.toLowerCase()) ||
                item.Constructor.name.toLowerCase().includes(search.toLowerCase())
            );
        });

        setFilteredRaceResults(resultRaceResults);
        setFilteredQualis(resultQualis);
    }, [search, raceResults, qualis, year]);

    const getRaceDetails = async () => {

        setIsError(false);
        try {
            const urlRaceDetails = `https://api.jolpi.ca/ergast/f1/${year}/${params.id}/results/1.json`;
            const urlQualis = `https://api.jolpi.ca/ergast/f1/${year}/${params.id}/qualifying.json`;
            const urlRaceResults = `https://api.jolpi.ca/ergast/f1/${year}/${params.id}/results.json`;

            const responseRaceDetails = await axios.get(urlRaceDetails);
            // console.log(responseRaceDetails.data.MRData.RaceTable.Races);
            const responseQualis = await axios.get(urlQualis);
            // console.log(responseQualis.data.MRData.RaceTable.Races[0].QualifyingResults);
            const responseRaceResults = await axios.get(urlRaceResults);
            // console.log(responseRaceResults.data.MRData.RaceTable.Races[0].Results);

            setQualis(responseQualis.data.MRData.RaceTable.Races[0].QualifyingResults);
            setRaceResults(responseRaceResults.data.MRData.RaceTable.Races[0].Results);
            setRaceDetails(responseRaceDetails.data.MRData.RaceTable.Races[0]);
        }
        catch (err) {
            setIsError(true);
            console.error(err);
        }
        finally {
            setLoading(false);
        }

    };

    const handleClickDriver = (id) => {
        navigate(`/driverDetails/${id}`);
    }

    const handleClickDetails = (id) => {
        navigate(`/teamDetails/${id}`);
    };

    const getBestTime = (q1, q2, q3) => {
        // console.log("q1 => ", q1, "q2 =>", q2, "q3 => ", q3);
        const bestTime = [];
        bestTime.push(q1, q2, q3);
        bestTime.sort();
        //Remove from array if we have empty string
        const filteredArray = bestTime.filter(item => typeof item === "string" && item.trim() !== "");

        // console.log(filteredArray[0]);
        return (filteredArray[0] === undefined ? "DNQ" : filteredArray[0]);
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
            label: raceDetails?.raceName,
            route: ""
        }
    ];

    if (isError) {
        return (
            <>
                <Breadcrumbs items={breadcrumbs} />
                <h2>There is no info for this race for year {year}</h2>
            </>
        );
    }
    // console.log(raceResults);
    // console.log(qualis);
    // console.log(raceDetails);

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
                <p>Full report: <a target="_blank" href={raceDetails.url}><ExportOutlined /></a></p>
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

                    {filteredQualis.map((quali, i) => {
                        return (
                            <tr key={i}>
                                <td style={{ backgroundColor: getColor(Number(quali.position)) }}
                                    className={getTopThreeClassName(Number(quali.position))}
                                >{quali.position}</td>
                                <td className="clickable" onClick={() => handleClickDriver(quali.Driver.driverId)}
                                > <Flag country={getFlagByNationality(props.flags, quali.Driver.nationality)} />{quali.Driver.familyName}</td>
                                <td className="clickable" onClick={() => handleClickDetails(quali.Constructor.constructorId)}
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

                    {filteredRaceResults.map((result, i) => {
                        return (
                            <tr key={i}>
                                <td
                                    style={{ backgroundColor: getColor(Number(result.position)) }}
                                    className={getTopThreeClassName(Number(result.position))}
                                >{result.position}</td>
                                <td className="clickable" onClick={() => handleClickDriver(result.Driver.driverId)}
                                > <Flag country={getFlagByNationality(props.flags, result.Driver.nationality)} />{result.Driver.familyName}</td>
                                <td className="clickable" onClick={() => handleClickDetails(result.Constructor.constructorId)}
                                >{result.Constructor.name}</td>
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
