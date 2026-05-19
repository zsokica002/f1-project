import { BrowserRouter, Routes, Route, Link } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import Drivers from "./components/Drivers";
import AllTeams from "./components/AllTeams";
import Races from "./components/Races";
import RaceDetails from "./components/RaceDetails";
import DriverDetails from "./components/DriverDetails";
import TeamResults from "./components/TeamResults";

export default function App() {
  const [flags, setFlags] = useState([]);

  useEffect(() => {
    getFlags();
  }, []);

  const getFlags = async () => {
    const url = "https://raw.githubusercontent.com/Imagin-io/country-nationality-list/refs/heads/master/countries.json";
    const response = await axios.get(url);
    setFlags(response.data);
    // console.log(response.data);
  }

  return (
    <BrowserRouter>
      <ul className="nav" >
        <li><Link className="nav-links" to="/" >Drivers</Link></li>
        <li><Link className="nav-links" to="/teams" >Teams</Link></li>
        <li><Link className="nav-links" to="/races">Races</Link></li>
      </ul>

      <Routes>
        <Route path="/" element={<Drivers flags={flags} />} />
        <Route path="/driverDetails/:id" element={<DriverDetails flags={flags}/>} />
        <Route path="/teams" element={<AllTeams />} />
        <Route path="/teamDetails/:id" element={<TeamResults />} />
        <Route path="/races" element={<Races />} />
        <Route path="/raceDetails/:id" element={<RaceDetails />} />
      </Routes>

    </BrowserRouter>
  )
}