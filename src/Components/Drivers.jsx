import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import Flag from "react-flagkit";
import DriverDetails from "./DriverDetails";

export default function Drivers(props) {
  const [loading, setLoading] = useState(true);
  const [drivers, setDrivers] = useState([]);
  const [year, setYear] = useState("");

  useEffect(() => {
    getDrivers();
  }, []);

  const getDrivers = async () => {
    const url = "https://api.jolpi.ca/ergast/f1/2025/driverStandings.json"
    const response = await axios.get(url);
    setDrivers(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
    setYear(response.data.MRData.StandingsTable.season);
    setLoading(false);
  };

  const handleClickDriver = () => {
    console.log("click...driver");
  
  }

  const handleClickConstructor = ()=>{
    console.log("click...constructor");
  }

  const getCountryFlag =(nation)=>{
    const flagA2 = props.flags.find(flag=> flag.nationality === nation);
    return flagA2?.alpha_2_code;
  }

  if (loading) {
    return <Loader />
  }

  return (
    <>
      <h1>Drivers Championship</h1>
      <table >
        <thead>
          <tr>
            <th colSpan={4}>Drivers Championship Standings - {year}</th>
          </tr>
        </thead>
        {drivers.map((driver) => {
          return (
            <tbody key={driver.Driver.permanentNumber}>
              <tr>
                <td>{driver.position}</td>
                <td onClick={() => handleClickDriver()}><Flag country= {getCountryFlag(driver.Driver.nationality)} />  {driver.Driver.givenName} {driver.Driver.familyName}</td>
                <td onClick={() => handleClickConstructor()}>{driver.Constructors[0].name}</td>
                <td>{driver.points}</td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </>
  );
}