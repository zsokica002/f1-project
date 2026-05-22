import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import Flag from "react-flagkit";
import { useNavigate } from "react-router";
import { getFlagByNationality } from "../helpers/getFlags";
import Breadcrumbs from "./Breadcrumbs";
import { getColor, getTopThreeClassName} from "../helpers/getColor";


export default function Drivers(props) {
  const [loading, setLoading] = useState(true);
  const [drivers, setDrivers] = useState([]);
  const [filteredDrivers, setFilteredDrivers] = useState([]);
  const [positionColor, setPositionColor] = useState([]);
  console.log(props);
  const search = props.search;
  const year = props.year;
  // console.log(search);
  const navigate = useNavigate();

  useEffect(() => {
    getDrivers();
  }, [year]);

  useEffect(() => {
    const result = drivers.filter((item) => {
      return (
        item.Driver.givenName.toLowerCase().includes(search.toLowerCase()) ||
        item.Driver.familyName.toLowerCase().includes(search.toLowerCase()) ||
        item.Constructors[0].name.toLowerCase().includes(search.toLowerCase())
      );
    });
    setFilteredDrivers(result);
  }, [search, drivers, year]);

  const getDrivers = async () => {
    const url = `https://api.jolpi.ca/ergast/f1/${year}/driverStandings.json`
    const response = await axios.get(url);
    setDrivers(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
    // setYear(response.data.MRData.StandingsTable.season);
    setLoading(false);
  };

  const handleClickDriver = (id) => {
    navigate(`/driverDetails/${id}`);

  }

  const handleClickConstructor = (id) => {
    navigate(`/teamDetails/${id}`);
  }


  if (loading) {
    return <Loader />
  }

  const breadcrumbs = [
    {
      label: "Drivers",
      route: ""
    }
  ];


  // console.log(drivers);

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <h1>Drivers Championship</h1>
      <table className="table">
        <thead>
          <tr>
            <th colSpan={4}>Drivers Championship Standings - {year}</th>
          </tr>
        </thead>
        {filteredDrivers.map((driver) => {
          return (
            <tbody key={driver.Driver.permanentNumber}>
              <tr>
                <td style={{ backgroundColor: getColor(Number(driver.position)) }}
                 className={getTopThreeClassName(Number(driver.position))}
                >{driver.position}</td>
                <td className="clickable" onClick={() => handleClickDriver(driver.Driver.driverId)}><Flag country={getFlagByNationality(props.flags, driver.Driver.nationality)} />  {driver.Driver.givenName} {driver.Driver.familyName}</td>
                <td className="clickable" onClick={() => handleClickConstructor(driver.Constructors[0].constructorId)}>{driver.Constructors[0].name}</td>
                <td>{driver.points}</td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </>
  );
}