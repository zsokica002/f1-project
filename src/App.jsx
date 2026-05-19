import { BrowserRouter, Routes, Route, Link } from "react-router";
import Drivers from "./components/Drivers";
import AllTeams from "./components/AllTeams";
import Races from "./components/Races";
import TeamsDetails from "./components/TeamsDetails";
import RaceDetails from "./components/RaceDetails";
import DriverDetails from "./components/DriverDetails";
import TeamResults from "./components/TeamResults";

export default function App() {

  return (
    <BrowserRouter>
      <ul className="nav" >
        <li><Link className="nav-links" to="/" >Drivers</Link></li>
        <li><Link className="nav-links" to="/teams" >Teams</Link></li>
        <li><Link className="nav-links" to="/races">Races</Link></li>
      </ul>

      <Routes>
        <Route path="/" element={<Drivers />} />
        <Route path="/teams" element={<AllTeams />} />
        <Route path="/details/:id" element={<TeamResults />} />
        <Route path="/races" element={<Races />} />
        <Route path="/teamsDetails/:id" element={<TeamsDetails />} />
      </Routes>

    </BrowserRouter>
  )
}
