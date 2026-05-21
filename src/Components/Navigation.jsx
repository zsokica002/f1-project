import { Link } from "react-router";

export default function Navigacija() {
    return (
        <ul className="nav" >
            <li><Link className="nav-links" to="/" >Drivers</Link></li>
            <li><Link className="nav-links" to="/teams" >Teams</Link></li>
            <li><Link className="nav-links" to="/races">Races</Link></li>
        </ul>
    );
}