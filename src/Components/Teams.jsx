import { useState, useEffect } from "react";
import Loader from "./Loader";
import Flag from "react-flagkit";
import axios from "axios";
import { useNavigate } from "react-router";
import { getFlagByNationality } from "../helpers/getFlags";
import Breadcrumbs from "./Breadcrumbs";
import { ExportOutlined } from "@ant-design/icons";
import { getColor, getTopThreeClassName} from "../helpers/getColor";

export default function AllTeams(props) {
    const [allTeams, setAllTeams] = useState([]);
    const [loading, setLoading] = useState(true);
   // const [year, setYear] = useState("");
    const [filteredTeams, setFilteredTeams] = useState([]);
    const [positionColor, setPositionColor] = useState([]);


    const search = props.search;
    const year = props.year;
    //console.log(search);
    const navigate = useNavigate();




    useEffect(() => {
        getAllTeams();
    }, [year]);

    useEffect(() => {
        const result = allTeams.filter((item) => {
            return (
                item.Constructor.name.toLowerCase().includes(search.toLowerCase())
            );
        });
        setFilteredTeams(result);
    }, [search, allTeams, year]);

    const getAllTeams = async () => {
        const url = `https://api.jolpi.ca/ergast/f1/${year}/constructorStandings.json`;

        const response = await axios.get(url);

        setAllTeams(response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
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
        <>
            <Breadcrumbs items={breadcrumbs} />
            <h2>All Teams 2025</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th colSpan={3}>Constructors Championship Standings - {year}</th>
                        <th>Points</th>
                    </tr>
                </thead>

                <tbody className="team">
                    {filteredTeams.map((team) => {
                        return (
                            <tr key={team.Constructor.constructorId}>
                                <td style={{ backgroundColor: getColor(Number(team.position)) }}
                 className={getTopThreeClassName(Number(team.position))}>{team.position}</td>
                                <td className="clickable" onClick={() => handleClickDetails(team.Constructor.constructorId)}>
                                    <Flag country={getFlagByNationality(props.flags, team.Constructor.nationality)} />
                                      {team.Constructor.name}  </td>

                                <td>Details <a target="_blank" href={team.Constructor.url}><ExportOutlined /></a></td>

                                <td>{team.points}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}
