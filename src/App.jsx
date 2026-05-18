import { BrowserRouter, Routes, Route, Link } from "react-router";
import Drivers from "./components/Drivers";
import AllTeams from "./components/AllTeams";

export default function App() {

  return (
    <BrowserRouter>
      <ul>
        <li><Link to="/" >Home</Link></li>
        <li><Link to="/teams" >Teams</Link></li>
        <li><Link to="/races"></Link></li>
      </ul>

      <Routes>
        <Route path="/" element={<Drivers />} />
        <Route path="/teams" element={<AllTeams />} />
        <Route path="/races" element={<Races />} />
      </Routes>

    </BrowserRouter>
  )
}
