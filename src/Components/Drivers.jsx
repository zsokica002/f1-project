import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";

export default function Drivers() {
  const [loading, setLoading] = useState(true);
  const [drivers, setDrivers] = useState([]);


  useEffect(() => {
    getDrivers();
  }, []);

  const getDrivers = async () => {
    const url = "https://api.jolpi.ca/ergast/f1/2025/driverStandings.json"
    const response = await axios.get(url);
    setDrivers(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
    console.log(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
    setLoading(false);
  }

  if(loading){
    return <Loader/>
  }
  return (
    <>
      <h1>Drivers Championship</h1>

      {drivers.map((driver) => {
        return (
          <table key={driver.Driver.permanentNumber}>
            <tr>
              <td>{driver.position}</td>
              <td>{driver.Driver.givenName} {driver.Driver.familyName}</td>
              <td>{driver.Constructors.name}</td>
              <td>{driver.points}</td>
            </tr>
          </table>
        );
      })}
    </>
  );
}