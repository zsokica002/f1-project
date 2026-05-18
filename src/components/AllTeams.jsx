import { useState, useEffect } from "react";
import Loader from "./components/Loader";
import axios from "axios";

export default function AllTeams() {
    const [allTeams, setAllTeams] = useState([]);
    const [loading, setLoader] = useState(true);

    useEffect = (() => {
        getAllTeams();
    }, []);

    const getAllTeams = async () => {
        const url = "https://api.jolpi.ca/ergast/f1/2025/constructorStandings.json";

        const response = await axios.get(url);
        setAllTeams(response.data);
        setLoading(false);
    }

    if (loading) {
        return
        <Loader />;
    }




    return (
        <div>

            <h2>All Teams 2025</h2>
            <div>
                {allTeams.map((allTeam) => {

                    return (
                        <div key={allTeam.id}>
                            <p>{allTeam.season}</p>
                            <p>{allTeam.round}</p>
                            <p>{allTeam.position}</p>
                            <p>{allTeam.points}</p>
                            <p>{allTeam.wins}</p>
                            <p>{allTeam.name}</p>
                            <p>{allTeam.nationality}</p>
                            <p></p>
                        </div>

                    );
                })}

            </div>

        </div>
    );
}