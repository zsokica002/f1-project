import { Link, useLocation } from "react-router";

export default function Breadcrumbs() {

    const location = useLocation();

    return (
        <div>
            <ul>
                <li><Link to="/">home</Link></li>
                <li><Link to="/drivers">drivers</Link></li>
                <li><Link to="/driverDetails/:id">driver details</Link></li>
            </ul>
        </div>
    );
}
