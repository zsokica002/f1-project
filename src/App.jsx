import { BrowserRouter, Routes, Route, Link } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import Drivers from "./components/Drivers";
import Teams from "./components/Teams";
import Races from "./components/Races";
import RaceDetails from "./components/RaceDetails";
import DriverDetails from "./components/DriverDetails";
import TeamDetails from "./components/TeamDetails";
import Navigation from "./components/Navigation";

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
      <Navigation />

      <Routes>
        <Route path="/" element={<Drivers flags={flags} />} />
        <Route path="/driverDetails/:id" element={<DriverDetails flags={flags} />} />
        <Route path="/teams" element={<Teams flags={flags} />} />
        <Route path="/teamDetails/:id" element={<TeamDetails flags={flags} />} />
        <Route path="/races" element={<Races flags={flags} />} />
        <Route path="/raceDetails/:id" element={<RaceDetails flags={flags} />} />
      </Routes>

    </BrowserRouter>
  )
}