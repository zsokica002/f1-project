import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import Flag from "react-flagkit";
import { useNavigate } from "react-router";
import { getFlagByNationality } from "../helpers/getFlags";
import Breadcrumbs from "./Breadcrumbs";
import { getTopThreeClassName } from "../helpers/getColor";
import lizardson from "../helpers/lizardson.json";



export default function Drivers(props) {
  const [loading, setLoading] = useState(true);
  const [drivers, setDrivers] = useState([]);
  const [filteredDrivers, setFilteredDrivers] = useState([]);

  const search = props.search;
  const year = props.year;
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
    const url = `https://api.jolpi.ca/ergast/f1/${year}/driverStandings.json`;

    const response = await axios.get(url);

    setDrivers(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
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

  console.log(lizardson.DriverStandings[0]);

  return (
    <div className="component-wrapper">
      <Breadcrumbs items={breadcrumbs} />

      <h2 className="component-title">Drivers Championship {year}</h2>

      <table className="table">
        <thead>
          <tr>
            <th colSpan={4}>Drivers Championship Standings</th>
          </tr>
          <tr>
            <th>Pos</th>
            <th>Driver</th>
            <th>Constructor</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody >
          {filteredDrivers.map((driver) => {
            return (
              <tr key={driver.position}>
                <td className={getTopThreeClassName(Number(driver.position))}>
                  <div className="inner">
                    {driver.position}
                  </div>
                </td>
                <td className="clickable" onClick={() => handleClickDriver(driver.Driver.driverId)}>
                  <div>
                    <Flag country={getFlagByNationality(props.flags, driver.Driver.nationality)} />
                    <p>{driver.Driver.givenName} {driver.Driver.familyName}</p>
                  </div>
                </td>
                <td className="clickable" onClick={() => handleClickConstructor(driver.Constructors[0].constructorId)}>
                  {driver.Constructors[0].name}
                </td>
                <td>{driver.points}</td>
              </tr>
            );
          })}

        </tbody>

        {year === "2024" ? <tbody>{
          <tr>
            <td>
              <div className="inner">
                {lizardson.DriverStandings[0].position}
              </div>
            </td>
            <td className="clickable" onClick={() => handleClickDriver(lizardson.DriverStandings[0].Driver.driverId)}>
              <div>
                <Flag country={getFlagByNationality(props.flags, lizardson.DriverStandings[0].Driver.nationality)} />
                <p>{lizardson.DriverStandings[0].Driver.givenName} {lizardson.DriverStandings[0].Driver.familyName}</p>
              </div>
            </td>
            <td className="clickable"
              onClick={() => handleClickConstructor(lizardson.DriverStandings[0].Constructors[0].constructorId)}>
              {lizardson.DriverStandings[0].Constructors[0].name}
            </td>
            <td>
              {lizardson.DriverStandings[0].points}
            </td>
          </tr>
        }</tbody> : null}


      </table>

    </div >
  );
}