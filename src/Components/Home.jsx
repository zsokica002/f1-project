import { Link } from "react-router";

export default function Home() {

    return (
        <div>

            <video src="/pozadina.mp4" autoPlay muted loop id="pozadina"></video>

            <div className="content">
                <h1>Formula 1 Racing Info Sheets 2025</h1>

                <p>Welcome to the landing page, nerd! Retire your janky Excel spredsheet and make way for this super sleek and sexy website for all your 2025 season F1 needs that you totally can't find anywhere else, only here! Stay informed about all your favorite drivers with our thorough database and organized with our state of the art filter and search super-combo! </p>

                <div className="buttons">
                    <Link className="btn" to="/drivers">Drivers</Link>
                    <Link className="btn" to="/teams">Teams</Link>
                    <Link className="btn" to="/races">Races</Link>
                </div>

            </div>


        </div>
    );
}