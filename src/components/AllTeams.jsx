import { useState, useEffect } from "react";
import Loader from "./Loader";
import axios from "axios";
import Flags from "./Flags";


export default function AllTeams() {
    const [allTeams, setAllTeams] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllTeams();
    }, []);

    const getAllTeams = async () => {
        const url = "https://api.jolpi.ca/ergast/f1/2025/constructorStandings.json";

        const response = await axios.get(url);
        setAllTeams(response.data.MRData.StandingsTable.StandingsLists[0]
            .ConstructorStandings);
        setLoading(false);
    };

    if (loading) {
        return <Loader />;
    }




    return (
<>
<h2>All Teams 2025</h2>
        <table className="container">

           <thead ><tr><th colSpan={4}>Constructors Championship Standings - </th></tr></thead>
    
                {allTeams.map((team, i) => {

                    return (
                        <tbody key={i} className="team">
<tr>
                            <td>{team.Constructor.name}</td>

                            <td>Position: {team.position}</td>
                            <td><Flags />Points: {team.points}</td>
                            <td>Wins: {team.wins}</td>
                            <td>Nationality: {team.Constructor.nationality}</td>
                            </tr>
                        </tbody>

                    );
                })}

         

        </table>
        </>

    );
}