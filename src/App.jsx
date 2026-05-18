import Loader from "./Components/Loader";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import Drivers from "./components/Drivers";

export default function App() {

  return (
    <BrowserRouter>
      <Link to="/" >Home</Link>

      <Routes>
        <Route path="/" element={<Drivers />} />
      </Routes>

    </BrowserRouter>
  )
}
