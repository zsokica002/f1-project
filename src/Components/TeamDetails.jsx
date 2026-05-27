import { useState, useEffect } from "react";
import Loader from "./Loader";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import Flag from "react-flagkit";
import { getFlagByNationality, getFlagByRaceLocation } from "../helpers/getFlags";
import Breadcrumbs from "./Breadcrumbs";
import { ExportOutlined } from "@ant-design/icons";
import { getTopThreeClassName } from "../helpers/getColor";

export default function TeamDetails(props) {

    const [teamResults, setTeamResults] = useState([]);
    const [teamDetails, setTeamDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filteredTeamDetails, setFilteredTeamDetails] = useState([]);
    const [isError, setIsError] = useState(false);

    const year = props.year;
    const search = props.search;
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getTeamDetails();
    }, [year]);

    useEffect(() => {
        const result = teamResults.filter((item) => {
            return (
                item.Circuit.circuitName.toLowerCase().includes(search.toLowerCase()) ||
                item.Circuit.Location.country.toLowerCase().includes(search.toLowerCase())
            );
        });

        setFilteredTeamDetails(result);
    }, [search, teamResults, year]);

    const getTeamDetails = async () => {

        setIsError(false);

        try {
            const urlResults = `https://api.jolpi.ca/ergast/f1/${year}/constructors/${params.id}/results.json`;
            const urlDetails = `https://api.jolpi.ca/ergast/f1/${year}/constructors/${params.id}/constructorStandings.json`;
            const responseResults = await axios.get(urlResults);
            const responseDetails = await axios.get(urlDetails);

            setTeamResults(responseResults.data.MRData.RaceTable.Races);
            setTeamDetails(responseDetails.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0]);

        } catch (err) {
            setIsError(true);
        } finally {
            setLoading(false);
        }
    };

    const handleClickDetails = (id) => {
        navigate(`/raceDetails/${id}`)
    };

    const handleClickDriver = (id) => {
        navigate(`/driverDetails/${id}`);
    };

    if (loading) {
        return <Loader />;
    };

    const breadcrumbs = [
        {
            label: "Teams",
            route: "/teams"
        },
        {
            label: teamResults[0]?.Results[0]?.Constructor?.name, route: ""
        }
    ];

    if (isError) {
        return (
            <div className="errWithStyle">
                <Breadcrumbs items={breadcrumbs} />
                <h2>We do not have any info for this team for {year}</h2>
                <p>Sowwie about that...</p>
                <h2>: - &#40;</h2>
                <img className="red-flag" onClick={() => navigate("/driverDetails/lizardson")} src="/imgs/red-flag.gif" />
            </div>
        );
    }

    return (

        <div className="component-wrapper">
            <Breadcrumbs items={breadcrumbs} />

            <h1>{teamResults[0]?.Results[0].Constructor.name} results</h1>

            <div className="details-card">
                <img src={`/teamLogo/${teamDetails?.Constructor.constructorId}.jpg`} alt="slika" width={250} />

                <div className="flag-team-name">
                    <Flag country={getFlagByNationality(props.flags, teamDetails?.Constructor.nationality)} />
                    <p>{teamResults[0]?.Results[0].Constructor.name}</p>
                </div>

                <p>Nationality: {teamResults[0]?.Results[0].Constructor.nationality}</p>
                <p>Position: {teamDetails?.position}</p>
                <p>Points: {teamDetails?.points}</p>
                <p>History: <a target="_blank" href={teamDetails?.Constructor.url}><ExportOutlined /></a></p>
            </div>

            <table className="table" border={1}>
                <thead>
                    <tr>
                        <th className="main-table-title" colSpan={5}>Formula 1 Results {year}</th>
                    </tr>
                    <tr>
                        <th>Round</th>
                        <th>Grand Prix</th>
                        <th className="clickable" onClick={() => handleClickDriver(teamResults[0]?.Results[0].Driver.driverId)}
                        >{teamResults[0]?.Results[0].Driver.familyName}</th>
                        <th className="clickable" onClick={() => handleClickDriver(teamResults[0]?.Results[1].Driver.driverId)}
                        >{teamResults[0]?.Results[1].Driver.familyName}</th>
                        <th>Points</th>
                    </tr>
                </thead>

                <tbody className="team">
                    {filteredTeamDetails.map((race, i) => (
                        <tr key={i}>
                            <td>{race.round}</td>
                            <td className="clickable" onClick={() => handleClickDetails(race.round)}>
                                <div>
                                    <Flag country={getFlagByRaceLocation(props.flags, race?.Circuit.Location.country)} />
                                    <p>{race.raceName}</p>
                                </div>
                            </td>
                            <td className={getTopThreeClassName(Number(race?.Results[0]?.position))}>
                                <div className="inner">
                                    {race.Results[0]?.position || "N/A"}
                                </div>
                            </td>
                            <td className={getTopThreeClassName(Number(race?.Results[1]?.position))}>
                                <div className="inner">
                                    {race.Results[1]?.position || "N/A"}
                                </div>
                            </td>
                            <td>
                                {race.Results[1]?.points !== undefined ?
                                    Number(race?.Results[0]?.points) + Number(race?.Results[1]?.points) :
                                    "N/A"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );

}