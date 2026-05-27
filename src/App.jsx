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
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import Data from "./components/Data";

export default function App() {
  const [flags, setFlags] = useState([]);
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("2026");

  useEffect(() => {
    getFlags();
  }, []);

  const getFlags = async () => {
    const url = "https://raw.githubusercontent.com/Imagin-io/country-nationality-list/refs/heads/master/countries.json";
    const response = await axios.get(url);
    setFlags(response.data);
    // console.log(response.data);
  }

  const yearArray = [];
  for (let i = 2026; i >= 2000; i--) {
    yearArray.push(i);
  }

  return (
    <BrowserRouter>
      <div className="navig">
        <div>
          <Navigation />

          <select
            name="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}>

            <option value="" disabled>Select a year</option>
            {yearArray.map((year) => {
              return (
                <option
                  value={year}
                  key={year}>
                  {year}
                </option>
              )
            })
            }
          </select>

        </div>

        <div className="search-bar">
          <label htmlFor="search-field">
            <SearchOutlined />
            <input name="search" id="search-field" placeholder="Search for..." type="text" value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span onClick={() => setSearch("")} className="clear-icon">{search !== "" ? <CloseOutlined /> : null}</span>
          </label>

        </div>
      </div>


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drivers" element={<Drivers flags={flags} search={search} year={year} />} />
        <Route path="/driverDetails/:id" element={<DriverDetails flags={flags} search={search} year={year} />} />
        <Route path="/teams" element={<Teams flags={flags} search={search} year={year} />} />
        <Route path="/teamDetails/:id" element={<TeamDetails flags={flags} search={search} year={year} />} />
        <Route path="/races" element={<Races flags={flags} search={search} year={year} />} />
        <Route path="/raceDetails/:id" element={<RaceDetails flags={flags} search={search} year={year} />} />
        <Route path="/driverDetails/lizardson" element={<Data />} flags={flags} />
      </Routes>

      <div className="footer-wrapper">
        <div className="footer">
          <h4>4LFA Team</h4>
          <div className="names-wrapper">
            <div><p>Iva</p> <hr /> <p>Konc</p></div>

            <span>+</span>

            <div><p>Svetlana</p> <hr /> <p>Isakov</p></div>

            <span>-</span>

            <div><p>Sofija</p> <hr /> <p>Curcic</p></div>

            <span>x</span>

            <div><p>Borislava</p> <hr /> <p>Vulic</p></div>

            <span>/</span>

            <div><p>Milan</p> <hr /> <p>Cubrilo</p></div>
          </div>

          <p className="rights-reserved">&copy; All Rights Reserved - 2026</p>
        </div>
      </div>

    </BrowserRouter>
  )
}