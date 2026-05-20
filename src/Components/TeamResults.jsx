import { useState, useEffect } from "react";
import Loader from "./Loader";
import axios from "axios";
import { useParams } from "react-router";
import Flag from "react-flagkit";
import { getFlagByNationality, getFlagByRaceLocation } from "../helpers/getFlags";

export default function TeamResults(props) {

    const [teamResults, setTeamResults] = useState([]);
    const [teamDetails, setTeamDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [year, setYear] = useState("");

    const params = useParams();


    useEffect(() => {
        getTeamResults();
    }, []);

    const getTeamResults = async () => {
        const urlResults = `https://api.jolpi.ca/ergast/f1/2025/constructors/${params.id}/results.json`;
        const urlDetails = `https://api.jolpi.ca/ergast/f1/2025/constructors/${params.id}/constructorStandings.json`;


        const responseResults = await axios.get(urlResults);
        const responseDetails = await axios.get(urlDetails);

        // console.log(responseDetails.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0]);



        setTeamResults(responseResults.data.MRData.RaceTable.Races);
        setTeamDetails(responseDetails.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0]);
        setYear(responseResults.data.MRData.RaceTable.season);

        setLoading(false);
    };


    
    //console.log(teamResults);
    console.log(teamDetails);




    if (loading) {
        return <Loader />;
    }

    return (

        <div>
            <h1>{teamResults[0].Results[0].Constructor.name} results</h1>

            <div>
               
                 <img src={`/public/teamLogo/${teamDetails.Constructor.constructorId}.jpg`} alt="slika" width={250} />

               

                <p>{teamResults[0].Results[0].Constructor.name}</p>
                <p>Nationality: {teamResults[0].Results[0].Constructor.nationality}</p>
                <p>Position: {teamDetails.position}</p>
                <p>Points: {teamDetails.points}</p>
                <p>History: <a target="_blank" href={teamDetails.Constructor.url}>ikonica!!!</a></p>

            </div>

            <table className="table" border={1}>
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
                            <td><Flag />
                                {race.raceName}</td>
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