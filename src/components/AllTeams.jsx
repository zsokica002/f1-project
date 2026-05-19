import { useState, useEffect } from "react";
import Loader from "./Loader";
import axios from "axios";
import Flags from "./Flags";
import {useNavigate} from "react-router";

export default function AllTeams() {
    const [allTeams, setAllTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
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

    const handleClickDetails = (id) => {
        console.log("handleClickDetails ", id);
        navigate(`/details/${id}`);
        
    };

    if (loading) {
        return <Loader />;
    }




    return (
<>
<h2>All Teams 2025</h2>
        <table className="container">

           <thead ><tr><th colSpan={4}>Constructors Championship Standings - {year}</th></tr></thead>
    
                {allTeams.map((team, i) => {

                    return (
                        <tbody key={i} className="team">
<tr>
                            <td>{team.Constructor.name}</td>

                            <td>{team.position}</td>
                            <td><Flags />Points: {team.points}</td>
                            <td>{team.wins}</td>
                            <td>{team.Constructor.nationality}</td>
                            </tr>
                        </tbody>

                    );
                })}

         

        </table>
        </>

    );
}
