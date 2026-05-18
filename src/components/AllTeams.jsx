import { useState, useEffect } from "react";
import Loader from "./Loader";
import axios from "axios";

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
        <div className="container">

            <h2>All Teams 2025</h2>
            <div className="team-container">
                {allTeams.map((team, i) => {

                    return (
                        <div key={i} className="team">

                            <h3>{team.Constructor.name}</h3>

                            <p>Position: {team.position}</p>
                            <p>Points: {team.points}</p>
                            <p>Wins: {team.wins}</p>
                            <p>Nationality: {team.Constructor.nationality}</p>

                        </div>

                    );
                })}

            </div>

        </div>
    );
}