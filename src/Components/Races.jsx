import { useEffect, useState } from "react";
import Loader from "./Loader";
import axios from "axios";
import { useNavigate } from "react-router";
import Flag from "react-flagkit";
import { getFlagByNationality, getFlagByRaceLocation } from "../helpers/getFlags";
import Breadcrumbs from "./Breadcrumbs";

export default function Races(props) {
    const [races, setRaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredRaces, setFilteredRaces] = useState([]);

    const search = props.search;
    const navigate = useNavigate();

    useEffect(() => {
        getRaces();
    }, []);

    useEffect(() => {
        const result = races.filter((item) => {
            return (
                item.Circuit.Location.country.toLowerCase().includes(search.toLowerCase()) ||
                item.Circuit.circuitName.toLowerCase().includes(search.toLowerCase())
            );
        });
        setFilteredRaces(result);
    }, [races, search])

    const getRaces = async () => {
        const url = "https://api.jolpi.ca/ergast/f1/2025/results/1.json";

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

    console.log(races);

    const breadcrumbs = [
        {
            label: "Races",
            route: ""
        }
    ];

    return (
        <div>
            <Breadcrumbs items={breadcrumbs} />
            <table className="table" border={1}>
                <thead>
                    <tr>
                        <th colSpan={5}>Race calendar 2025</th>
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
                                <td onClick={() => handleClickDetails(race.round)}> <Flag country={getFlagByRaceLocation(props.flags, race.Circuit.Location.country)} />  {race.raceName} </td>
                                <td><a target="_blank" href={race.Circuit.url}>{race.Circuit.circuitName}</a></td>
                                <td>{race.date}</td>
                                <td onClick={() => handleClickDriver(race.Results[0].Driver.driverId)}> <Flag country={getFlagByNationality(props.flags, race.Results[0].Driver.nationality)} />{race.Results[0].Driver.familyName}</td>
                            </tr>
                        );
                    })}
                </tbody>

            </table>

        </div>
    );
}