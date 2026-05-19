import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loader from "./Loader";
import axios from "axios";
import Flag from "react-flagkit";

export default function DriverDetails(props) {

    const [driverInfo, setDriverInfo] = useState([]);
    const [driverResults, setDriverResults] = useState([]);
    const [loading, setLoading] = useState(true);

    const params = useParams();

    

    useEffect(()=>{
        getDriverDetails();
    },[]);

    const getDriverDetails = async()=>{
       const urlDriverInfo = `https://api.jolpi.ca/ergast/f1/2025/drivers/${params.id}/driverStandings.json`;
       const urlDriverResults = `https://api.jolpi.ca/ergast/f1/2025/drivers/${params.id}/results.json`;

       const response1 = await axios.get(urlDriverInfo);
       const response2 = await axios.get(urlDriverResults);

       console.log(response1.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]);
       console.log(response2.data.MRData.RaceTable.Races);
       setDriverInfo(response1.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]);
       setDriverResults(response2.data.MRData.RaceTable.Races);

       setLoading(false);
    }

    const getDriverNationality = (nation)=>{
       const driverFlagA2 = props.flags.find(flag => flag.nationality === nation);
    return driverFlagA2?.alpha_2_code;
    }

    const getRaceLocation = (nation)=> {
        const raceFlagA2 = props.flags.find(flag => flag.en_short_name === nation)
        return raceFlagA2?.alpha_2_code;
    }

    if(loading){
        return <Loader/>
    }

    return (
        <>
            <h1>Driver Details</h1>

            <div>
                <div>
                    <img src = {`/public/drivers2025/${driverInfo.Driver.driverId}.jpg`} alt={driverInfo.Driver.driverId}  width={250}/>
                    <div>
                        <p>{driverInfo.Driver.givenName} {driverInfo.Driver.familyName}</p>
                        <div> <Flag country={getDriverNationality(driverInfo.Driver.nationality)} size={50}/></div>    
                    </div>    
                    <p><b>Country: </b>{driverInfo.Driver.nationality}</p>
                    <p><b>Team: </b>{driverInfo.Constructors[0].name}</p>
                    <p><b>Birth: </b>{driverInfo.Driver.dateOfBirth}</p>
                    <p><a href={driverInfo.Driver.url} target="_blank"><b>Biography</b></a></p>
                </div>
            </div>

            <table>
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
                    {driverResults.map((result, i)=>{
                       return(
                         <tr key={i}>
                        <td>{result.Circuit.circuitName}</td>
                        <td><Flag country={getRaceLocation(result.Circuit.Location.country)}/>{result.Circuit.Location.country}</td>
                        <td>{result.Results[0].Constructor.name}</td>
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