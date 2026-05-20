import { useState, useEffect } from "react";
import Loader from "./Loader";
import axios from "axios";
import { useNavigate } from "react-router";
import TeamResults from "./TeamResults";

export default function AllTeams() {
    const [allTeams, setAllTeams] = useState([]);
    const [loading, setLoading] = useState(true);

    const [year, setYear] = useState("");

    useEffect(() => {
        getAllTeams();
    }, []);

    const getAllTeams = async () => {
        const url = "https://api.jolpi.ca/ergast/f1/2025/constructorStandings.json";

        const response = await axios.get(url);

        setAllTeams(response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
        setYear(response.data.MRData.StandingsTable.season);
        setLoading(false);
    };

    const navigate = useNavigate();

    const handleClickDetails = (id) => {
        // console.log("handleClickDetails ", id);
        navigate(`/teamDetails/${id}`);

    };

    if (loading) {
        return <Loader />;
    }

    console.log(allTeams);


    return (
        <>
            <h2>All Teams 2025</h2>
            <table className="container border" border={1} >
                <thead>
                    <tr>
                        <th colSpan={3}>Constructors Championship Standings - {year}</th>
                        <th>Points</th>
                    </tr>
                </thead>

                <tbody className="team">
                    {allTeams.map((team) => {
                        return (
                            <tr key={team.Constructor.constructorId}>
                                <td>{team.position}</td>
                                <td onClick={() => handleClickDetails(team.Constructor.constructorId)}
                                > {team.Constructor.name}</td>
                                <td><a target="_blank" href={team.Constructor.url}>Details</a></td>

                                <td>{team.points}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}