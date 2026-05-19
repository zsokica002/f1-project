import { useState, useEffect } from "react";
import Loader from "./Loader";
import axios from "axios";
import { useNavigate } from "react-router";

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
        setAllTeams(response.data.MRData.StandingsTable.StandingsLists[0]
            .ConstructorStandings);
        setYear(response.data.MRData.StandingsTable.season);
        setLoading(false);
    };
    const navigate = useNavigate();
    const handleClickDetails = (id) => {
        console.log("handleClickDetails ", id);
        navigate(`/details/${id}`);

    };

    if (loading) {
        return <Loader />;
    }

    console.log(allTeams);


    return (
        <>
            <h2>All Teams 2025</h2>
            <table className="container">
                <thead>
                    <tr>
                        <th colSpan={4}>Constructors Championship Standings - {year}</th>
                    </tr>
                </thead>

                <tbody className="team">
                    {allTeams.map((team) => {
                        return (
                            <tr key={team.Constructor.constructorId}>
                                <td>{team.position}</td>
                                <td>{team.Constructor.name}</td>
                                <td> <input type="button" value="Details" className="btn"
                                    onClick={() => handleClickDetails(team.Constructor.constructorId)} /></td>
                                <td>{team.points}</td>
                                {/*<td>{team.wins}</td>
                                <td>{team.Constructor.nationality}</td>*/}
                               
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}