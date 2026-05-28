import { useState, useEffect } from "react";
import Loader from "./Loader";
import Flag from "react-flagkit";
import axios from "axios";
import { useNavigate } from "react-router";
import { getFlagByNationality } from "../helpers/getFlags";
import Breadcrumbs from "./Breadcrumbs";
import { ExportOutlined } from "@ant-design/icons";
import { getTopThreeClassName } from "../helpers/getColor";

export default function Teams(props) {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredTeams, setFilteredTeams] = useState([]);

    const search = props.search;
    const year = props.year;
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
        setLoading(false);
    };

    const handleClickDetails = (id) => {
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

    return (
        <div className="component-wrapper">
            <Breadcrumbs items={breadcrumbs} />

            <h2>Constructor's Championship</h2>

            <table className="table">
                <thead>
                    <tr>
                        <th className="main-table-title" colSpan={4}>Constructors Championship Standings - {year}</th>
                    </tr>
                    <tr>
                        <th className="position-th">Position</th>
                        <th>Constructor</th>
                        <th>Details</th>
                        <th>Points</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredTeams.map((team) => {
                        return (
                            <tr key={team.Constructor.constructorId}>
                                <td className={getTopThreeClassName(Number(team.position))}>
                                    <div className="inner">
                                        {team?.position}
                                    </div>
                                </td>
                                <td className="clickable"
                                    onClick={() => handleClickDetails(team?.Constructor?.constructorId)}>
                                    <div> <Flag country={getFlagByNationality(props.flags, team?.Constructor?.nationality)} />
                                        <p>{team.Constructor.name}</p>
                                        <span className="invisible"></span>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <span className="invisible"></span>
                                        <p>Details </p>
                                        <a target="_blank" href={team?.Constructor?.url}><ExportOutlined /></a>
                                    </div>
                                </td>
                                <td>{team?.points}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
