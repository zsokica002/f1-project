import { useEffect, useState } from "react";
import Loader from "./Loader";
import axios from "axios";
import { useNavigate } from "react-router";
import Flag from "react-flagkit";
import { getFlagByNationality, getFlagByRaceLocation } from "../helpers/getFlags";
import Breadcrumbs from "./Breadcrumbs";
import { ExportOutlined } from "@ant-design/icons";

export default function Races(props) {
    const [races, setRaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredRaces, setFilteredRaces] = useState([]);

    const search = props.search;
    const navigate = useNavigate();
    const year = props.year;

    useEffect(() => {
        getRaces();
    }, [year]);

    useEffect(() => {
        const result = races.filter((item) => {
            return (
                item.Circuit.Location.country.toLowerCase().includes(search.toLowerCase()) ||
                item.Circuit.circuitName.toLowerCase().includes(search.toLowerCase())
            );
        });
        setFilteredRaces(result);
    }, [races, search, year])

    const getRaces = async () => {
        const url = `https://api.jolpi.ca/ergast/f1/${year}/results/1.json`;

        const response = await axios.get(url);
        // console.log(response.data.MRData.RaceTable.Races);

        setRaces(response.data.MRData.RaceTable.Races);
        setLoading(false);
    }

    const handleClickDetails = (id) => {
        navigate(`/raceDetails/${id}`)
    };

    const handleClickDriver = (id) => {
        navigate(`/driverDetails/${id}`);

    }

    if (loading) {
        return <Loader />
    }

    // console.log(races);

    const breadcrumbs = [
        {
            label: "Races",
            route: ""
        }
    ];

    return (
        <div className="component-wrapper">
            <Breadcrumbs items={breadcrumbs} />

            <h2>Race Calendar {year}</h2>
            <table className="table">
                <thead >
                    <tr>
                        <th className="main-table-title" colSpan={5}>Race calendar {year}</th>
                    </tr>
                    <tr>
                        <th>Round</th>
                        <th>Grand Prix</th>
                        <th>Circuit</th>
                        <th>Date</th>
                        <th>Winner</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredRaces.map((race, i) => {
                        return (
                            <tr key={i}>
                                <td>{race.round}</td>
                                <td className="clickable"
                                    onClick={() => handleClickDetails(race.round)}>
                                    <div>
                                        <Flag country={getFlagByRaceLocation(props.flags, race.Circuit.Location.country)} />
                                        <p>{race.raceName}</p>
                                    </div>
                                </td>
                                <td>
                                    <a target="_blank" href={race.Circuit.url}>
                                        {race.Circuit.circuitName} <ExportOutlined />
                                    </a>
                                </td>
                                <td>{race.date}</td>
                                <td className="clickable"
                                    onClick={() => handleClickDriver(race.Results[0].Driver.driverId)}>
                                    <div>
                                        <Flag country={getFlagByNationality(props.flags, race.Results[0].Driver.nationality)} />
                                        <p>{race.Results[0].Driver.familyName}</p>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>

            </table>

        </div>
    );
}