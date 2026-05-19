import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import Flag from "react-flagkit";
import { useNavigate } from "react-router";

export default function Drivers(props) {
  // console.log(props);
  const [loading, setLoading] = useState(true);
  const [drivers, setDrivers] = useState([]);
  const [year, setYear] = useState("");

  const navigate = useNavigate();

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

  const handleClickDriver = (id) => {
    navigate(`/driverDetails/${id}`);
  }

  const handleClickConstructor = () => {
    // console.log("click...constructor");
  }

  const getCountryFlag = (nation) => {
    // console.log(3);
    const flagA2 = props.flags.find(flag => flag.nationality === nation);
    return flagA2?.alpha_2_code;
  }


  if (loading) {
    return <Loader />
  }

  console.log(drivers);

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
                <td onClick={() => handleClickDriver(driver.Driver.driverId)}><Flag country={getCountryFlag(driver.Driver.nationality)} />  {driver.Driver.givenName} {driver.Driver.familyName}</td>
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