import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import Flags from "./Flags";

export default function Drivers() {
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
    console.log(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
    setLoading(false);
  }

  if (loading) {
    return <Loader />
  }
  return (
    <>
      <h1>Drivers Championship</h1>

      <table >
        <thead><tr><th colSpan={4}>Drivers Championship Standings - {year}</th></tr></thead>
        {drivers.map((driver) => {
          return (
            <tbody key={driver.Driver.permanentNumber}>
              <tr >
                <td>{driver.position}</td>
                <td><Flags /> {driver.Driver.givenName} {driver.Driver.familyName}</td>
                <td>{driver.Constructors[0].name}</td>
                <td>{driver.points}</td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </>
  );
}