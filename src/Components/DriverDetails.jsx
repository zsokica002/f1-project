import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Loader from "./Loader";
import axios from "axios";
import Flag from "react-flagkit";
import { getFlagByNationality, getFlagByRaceLocation } from "../helpers/getFlags";
// import Breadcrumbs from "./Breadcrumbs";

export default function DriverDetails(props) {

    const [driverInfo, setDriverInfo] = useState([]);
    const [driverResults, setDriverResults] = useState([]);
    const [loading, setLoading] = useState(true);

    const params = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        getDriverDetails();
    }, []);

    const getDriverDetails = async () => {
        const urlDriverInfo = `https://api.jolpi.ca/ergast/f1/2025/drivers/${params.id}/driverStandings.json`;
        const urlDriverResults = `https://api.jolpi.ca/ergast/f1/2025/drivers/${params.id}/results.json`;

        const response1 = await axios.get(urlDriverInfo);
        const response2 = await axios.get(urlDriverResults);

        // console.log(response1.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]);
        // console.log(response2.data.MRData.RaceTable.Races);
        setDriverInfo(response1.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]);
        setDriverResults(response2.data.MRData.RaceTable.Races);

        setLoading(false);

    }


    const handleClickDetails = (id) => {
        navigate(`/teamDetails/${id}`);
    };



    if (loading) {
        return <Loader />
    }

    console.log(driverResults);


    return (
        <>
            {/* <Breadcrumbs /> */}
            <h1>Driver Details</h1>

            <div>

                <img src={`/public/drivers2025/${driverInfo.Driver.driverId}.jpg`} alt={driverInfo.Driver.driverId} width={250} />
                <div>
                    <p>{driverInfo.Driver.givenName} {driverInfo.Driver.familyName}</p>
                    <div> <Flag country={getFlagByNationality(props.flags, driverInfo.Driver.nationality)} size={50} /></div>
                </div>
                <p><b>Country: </b>{driverInfo.Driver.nationality}</p>
                <p onClick={() => handleClickDetails(driverInfo.Constructors[0].constructorId)}
                ><b>Team: </b>{driverInfo.Constructors[0].name}</p>
                <p><b>Birth: </b>{driverInfo.Driver.dateOfBirth}</p>
                <p><a href={driverInfo.Driver.url} target="_blank"><b>Biography</b></a></p>

            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Round</th>
                        <th>Grand Prix</th>
                        <th>Team</th>
                        <th>Grid</th>
                        <th>Position</th>
                    </tr>
                </thead>
                <tbody>
                    {driverResults.map((result, i) => {
                        return (
                            <tr key={i}>
                                <td><a target="_blank" href={result.Circuit.url}>{result.Circuit.circuitName}</a></td>
                                <td><Flag country={getFlagByRaceLocation(props.flags, result.Circuit.Location.country)} />{result.Circuit.Location.country}</td>
                                <td onClick={() => handleClickDetails(result.Results[0].Constructor.constructorId)}
                                >{result.Results[0].Constructor.name}</td>
                                <td>{result.Results[0].grid}</td>
                                <td>{result.Results[0].position}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}