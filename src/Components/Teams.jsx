import { useState, useEffect } from "react";
import Loader from "./Loader";
import Flag from "react-flagkit";
import axios from "axios";
import { useNavigate } from "react-router";
import { getFlagByNationality } from "../helpers/getFlags";
import Breadcrumbs from "./Breadcrumbs";
import { ExportOutlined } from "@ant-design/icons";
import { getColor, getTopThreeClassName } from "../helpers/getColor";

export default function Teams(props) {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [year, setYear] = useState("");
    const [filteredTeams, setFilteredTeams] = useState([]);
 


    const search = props.search;
    const year = props.year;
    //console.log(search);
    const navigate = useNavigate();




    useEffect(() => {
        getTeams();
    }, [year]);

    useEffect(() => {
        const result = teams.filter((item) => {
            return (
                item.Constructor.name.toLowerCase().includes(search.toLowerCase())
            );
        });
        setFilteredTeams(result);
    }, [search, teams, year]);

    const getTeams = async () => {
        const url = `https://api.jolpi.ca/ergast/f1/${year}/constructorStandings.json`;

        const response = await axios.get(url);

        setTeams(response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
        //setYear(response.data.MRData.StandingsTable.season);
        setLoading(false);
    };




    const handleClickDetails = (id) => {
        // console.log("handleClickDetails ", id);
        navigate(`/teamDetails/${id}`);

    };

    if (loading) {
        return <Loader />;
    }

    const breadcrumbs = [
        {
            label: "Teams",
            route: ""
        }
    ];

    // console.log(allTeams);


    return (
        <div className="proba">
            <Breadcrumbs items={breadcrumbs} />
            <h2>Teams</h2>
            <table className="table" border={1}>
                <thead>
                    <tr>
                        <th className="vodeciNaslov" colSpan={4}>Constructors Championship Standings - {year}</th>

                    </tr>
                    <tr>
                        {/*<th>Position</th>
<th>?</th>
<th>Details</th>
<th>Points</th>*/}


                    </tr>
                </thead>

                <tbody className="team">
                    {filteredTeams.map((team) => {
                        return (
                            <tr key={team.Constructor.constructorId}>
                                <td style={{ backgroundColor: getColor(Number(team.position)) }}
                                    className={getTopThreeClassName(Number(team.position))}>{team.position}</td>
                                <td onClick={() => handleClickDetails(team.Constructor.constructorId)}>
                                    <div className="clickable"> <Flag country={getFlagByNationality(props.flags, team.Constructor.nationality)} />
                                        {team.Constructor.name}</div> </td>

                                <td>Details <a target="_blank" href={team.Constructor.url}><ExportOutlined /></a></td>

                                <td>{team.points}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
