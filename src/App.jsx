import { BrowserRouter, Routes, Route } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Drivers from "./components/Drivers";
import Teams from "./components/Teams";
import Races from "./components/Races";
import RaceDetails from "./components/RaceDetails";
import DriverDetails from "./components/DriverDetails";
import TeamDetails from "./components/TeamDetails";

export default function App() {
  const [flags, setFlags] = useState([]);
  const [search, setSearch] = useState("");

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
      <div>
        <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} />
        <Navigation />
      </div>


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drivers" element={<Drivers flags={flags} search={search}/>} />
        <Route path="/driverDetails/:id" element={<DriverDetails flags={flags} search={search}/>} />
        <Route path="/teams" element={<Teams flags={flags} search={search}/>} />
        <Route path="/teamDetails/:id" element={<TeamDetails flags={flags} search={search}/>} />
        <Route path="/races" element={<Races flags={flags} search={search}/>} />
        <Route path="/raceDetails/:id" element={<RaceDetails flags={flags} search={search}/>} />
      </Routes>

    </BrowserRouter>
  )
}