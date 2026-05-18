import { BrowserRouter, Routes, Route, Link } from "react-router";
import Drivers from "./components/Drivers";
import AllTeams from "./components/AllTeams";

export default function App() {

  return (
    <BrowserRouter>
      <Link to="/" >Home</Link>

      <Routes>
        <Route path="/" element={<Drivers />} />
        <Route path="/races" element={<Races />}
      </Routes>

      <AllTeams />

    </BrowserRouter>
  )
}
