import { useEffect, useState } from "react";
import axios from "axios";


export default function Drivers() {

  const [drivers, setDrivers] = useState([]);


  useEffect(() => {
    getDrivers();
  }, []);

  const getDrivers = async () => {
    const url = "https://api.jolpi.ca/ergast/f1/2025/driverStandings.json"
    const response = await axios.get(url);
    setDrivers(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
    console.log(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);

  }

  return (
    <>
      <h1>HELLo tHERE!</h1>

      {drivers.map((driver) => {
        return (
          <div key={driver.Driver.permanentNumber}>
            {/* OVO JE SAMO PRIVREMENO DA PROVERIM DA LI MI DOBRO RADI MAP */}
            <p>{driver.Driver.code}</p>
          </div>
        );
      })}
    </>
  );
}