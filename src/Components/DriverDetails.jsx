import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Loader from "./Loader";
import axios from "axios";
import Flag from "react-flagkit";
import { getFlagByNationality, getFlagByRaceLocation } from "../helpers/getFlags";
import Breadcrumbs from "./Breadcrumbs";
import { CaretDownOutlined, CaretUpOutlined, ExportOutlined } from "@ant-design/icons";
import { getColor, getTopThreeClassName } from "../helpers/getColor";

export default function DriverDetails(props) {
    const [driverInfo, setDriverInfo] = useState(null);
    const [driverResults, setDriverResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredDriverResults, setFilteredDriverResults] = useState([]);
    const [isError, setIsError] = useState(false);

    const year = props.year;
    const search = props.search;
    const params = useParams();
    const navigate = useNavigate();
    console.log(props.year)
    useEffect(() => {
        getDriverDetails();
    }, [year]);

    useEffect(() => {
        const result = driverResults.filter((item) => {
            return (
                item.Circuit.circuitName.toLowerCase().includes(search.toLowerCase()) ||
                item.Circuit.Location.country.toLowerCase().includes(search.toLowerCase())
            );
        });
        setFilteredDriverResults(result);
    }, [search, driverResults, year]);

    const getDriverDetails = async () => {
        setIsError(false);

        try {
            const urlDriverInfo = `https://api.jolpi.ca/ergast/f1/${year}/drivers/${params.id}/driverStandings.json`;
            const urlDriverResults = `https://api.jolpi.ca/ergast/f1/${year}/drivers/${params.id}/results.json`;
            const response1 = await axios.get(urlDriverInfo);
            const response2 = await axios.get(urlDriverResults);
            setDriverInfo(response1.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]);
            setDriverResults(response2.data.MRData.RaceTable.Races);
            console.log(year);
        } catch (err) {
            setIsError(true);
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    const handleClickDetails = (id) => {
        navigate(`/teamDetails/${id}`);
    };

    const handleRaceDetails = (id) => {
        navigate(`/raceDetails/${id}`)
    };


    if (loading) {
        return <Loader />
    }

    console.log("driverInfo ", driverInfo);

    const breadcrumbs = [
        { label: "Drivers", route: "/drivers" },
        { label: driverInfo?.Driver?.familyName, route: "" }
    ];

    if (isError) {
        return (
            <>
                <Breadcrumbs items={breadcrumbs} />
                <h2>There is no info for this driver for year {year}</h2>
            </>
        );
    }

    return (
        <>
            <Breadcrumbs items={breadcrumbs} />
            <h1>Driver Details</h1>

            <div>

                <img src={`/drivers2025/${driverInfo.Driver.driverId}.jpg`} alt={driverInfo.Driver.driverId} width={250} />
                <div>
                    <p>{driverInfo.Driver.givenName} {driverInfo.Driver.familyName}</p>
                    <div> <Flag country={getFlagByNationality(props.flags, driverInfo.Driver.nationality)} size={50} /></div>
                </div>
                <p>Nationality: {driverInfo.Driver.nationality}</p>
                <p onClick={() => handleClickDetails(driverInfo.Constructors[0].constructorId)}
                >Team: {driverInfo.Constructors[0].name}</p>
                <p>Birth: {driverInfo.Driver.dateOfBirth}</p>
                <p>Biography: <a href={driverInfo.Driver.url} target="_blank"><ExportOutlined /></a></p>

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
                    {filteredDriverResults.map((result, i) => {
                        return (
                            <tr key={i}>
                                <td><a target="_blank" href={result.Circuit.url}>{result.Circuit.circuitName} <ExportOutlined /></a></td>
                                <td className="clickable" onClick={() => handleRaceDetails(result.round)}
                                ><Flag country={getFlagByRaceLocation(props.flags, result.Circuit.Location.country)} />{result.Circuit.Location.country}</td>
                                <td className="clickable" onClick={() => handleClickDetails(result.Results[0].Constructor.constructorId)}
                                >{result.Results[0].Constructor.name}</td>
                                <td>{result.Results[0].grid}</td>
                                <td style={{ backgroundColor: getColor(Number(result.Results[0].position)) }}
                                    className={getTopThreeClassName(Number(result.Results[0].position))}
                                >{result.Results[0].position}</td>
                                <td>{Number(result.Results[0].grid) === Number(result.Results[0].position) ?
                                    null :
                                    Number(result.Results[0].grid) > Number(result.Results[0].position) ?
                                        <CaretUpOutlined style={{ color: "green" }} /> :
                                        <CaretDownOutlined style={{ color: "red" }} />}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}