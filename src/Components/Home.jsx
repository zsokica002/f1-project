import { Link, useNavigate } from "react-router";

export default function Home() {

    const navigate = useNavigate();

    return (
        <div>

            <video src="/pozadina.mp4" autoPlay muted loop id="pozadina"></video>

            <div className="content">
                <h1>Formula 1 Racing Info Sheets 2025</h1>

                <p>Welcome to the landing page, nerd! Retire your janky Excel spredsheet and make way for this super sleek and sexy website for all your 2025 season F1 needs that you totally can't find anywhere else, only here! Stay informed about all your favorite drivers with our thorough database and organized with our state of the art filter and search super-combo! "But Zso", I hear you ask, "couldn't I just Google all of this information?" Yes. Yes you could. It would be much faster and more convenient, but a ragtag bunch of nerds made this website for <i>you, personally</i> and we'd really appreciate you for using our silly little website that was totally not a school project that we needed to do to pass and get our frontend certification!! <i>Insert dev team name</i> sends their love! &lt;3</p>

                <div className="buttons">
                    <Link className="btn" to="/drivers">Drivers</Link>
                    <Link className="btn" to="/teams">Teams</Link>
                    <Link className="btn" to="/races">Races</Link>
                </div>

            </div>


        </div>
    );
}