import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Flag from "react-flagkit";
import { ExportOutlined } from "@ant-design/icons";
import Loader from "./Loader";
import Breadcrumbs from "./Breadcrumbs";
import { getFlagByNationality, getFlagByRaceLocation } from "../helpers/getFlags";
import { getTopThreeClassName } from "../helpers/getColor";

export default function RaceDetails(props) {

    const [qualis, setQualis] = useState([]);
    const [loading, setLoading] = useState(true);
    const [raceResults, setRaceResults] = useState([]);
    const [raceDetails, setRaceDetails] = useState(null);
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
            const responseQualis = await axios.get(urlQualis);
            const responseRaceResults = await axios.get(urlRaceResults);

            setQualis(responseQualis.data.MRData.RaceTable.Races[0].QualifyingResults);
            setRaceResults(responseRaceResults.data.MRData.RaceTable.Races[0].Results);
            setRaceDetails(responseRaceDetails.data.MRData.RaceTable.Races[0]);
        }
        catch (err) {
            setIsError(true);
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
        const bestTime = [];

        bestTime.push(q1, q2, q3);
        bestTime.sort();

        const filteredArray = bestTime.filter(item => typeof item === "string" && item.trim() !== "");

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
            <div className="errWithStyle">
                <Breadcrumbs items={breadcrumbs} />
                <h2>We have no info for this race for {year}</h2>
                <p>Sowwie...</p>
                <h2>: &#40;</h2>
                <video onClick={() => navigate("/driverDetails/lizardson")}
                    className="liz-video" src="/data.mp4" autoPlay muted loop>
                </video>
            </div>
        );
    }


    return (
        <div className="component-wrapper">

            <Breadcrumbs items={breadcrumbs} />

            <h1>{raceDetails?.raceName} {year}</h1>

            <div className="details-card">
                <Flag country={getFlagByRaceLocation(props.flags, raceDetails?.Circuit.Location.country)} />
                <p>{raceDetails?.raceName}</p>
                <p>Country: {raceDetails?.Circuit.Location.country}</p>
                <p>Location: {raceDetails?.Circuit.Location.locality}</p>
                <p>date: {raceDetails?.date}</p>
                <p><a target="_blank" href={raceDetails?.url}>Full report: <ExportOutlined /></a></p>
            </div>


            <div className="tables-wrapper">

                <table className="table">
                    <thead>
                        <tr>
                            <th className="main-table-title" colSpan={5}>Qualifying Results</th>
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
                                    <td className={getTopThreeClassName(Number(quali?.position))}>
                                        <div className="inner">
                                            {quali.position}
                                        </div>
                                    </td>
                                    <td className="clickable" onClick={() => handleClickDriver(quali?.Driver.driverId)}>
                                        <div>
                                            <Flag country={getFlagByNationality(props.flags, quali?.Driver.nationality)} />
                                            <p>{quali?.Driver.familyName}</p>
                                            <span className="invisible"></span>
                                        </div>
                                    </td>
                                    <td className="clickable" onClick={() => handleClickDetails(quali?.Constructor.constructorId)}>
                                        {quali?.Constructor.name}
                                    </td>
                                    <td>{getBestTime(quali?.Q1, quali?.Q2, quali?.Q3)}</td>
                                </tr>
                            );
                        })}

                    </tbody>
                </table>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="main-table-title" colSpan={5}>Race Results</th>
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
                                    <td className={getTopThreeClassName(Number(result.position))}>
                                        <div className="inner">
                                            {result.position}
                                        </div>
                                    </td>
                                    <td className="clickable" onClick={() => handleClickDriver(result.Driver.driverId)}>
                                        <div>
                                            <Flag country={getFlagByNationality(props.flags, result.Driver.nationality)} />
                                            <p>{result.Driver.familyName}</p>
                                            <span className="invisible"></span>
                                        </div>
                                    </td>
                                    <td className="clickable" onClick={() => handleClickDetails(result.Constructor.constructorId)}>
                                        {result.Constructor.name}
                                    </td>
                                    <td>{result.Time ? result.Time.time : result.status}</td>
                                    <td>{result.points}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
