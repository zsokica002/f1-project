import { useEffect, useState } from "react";
import Loader from "./Loader";
import axios from "axios";
import { useNavigate } from "react-router";

export default function Races() {
    const [races, setRaces] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        getRaces();

    }, []);

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



    return (
        <table>
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
                {races.map((race, i) => {
                    return (
                        <tr key={i}>
                            <td>{race.round}</td>
                            <td onClick={() => handleClickDetails(race.round)}> {race.raceName} </td>
                            <td><a target="_blank" href={race.Circuit.url}>{race.Circuit.circuitName}</a></td>
                            <td>{race.date}</td>
                            <td onClick={() => handleClickDriver(race.Results[0].Driver.driverId)}
                            >{race.Results[0].Driver.familyName}</td>
                        </tr>
                    );
                })}
            </tbody>


        </table >
    )
}