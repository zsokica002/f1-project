import { CaretUpOutlined, ExportOutlined } from "@ant-design/icons";
import Flag from "react-flagkit";
import { useNavigate } from "react-router";

export default function Data() {

    const handleClickDetails = () => {
        navigate(`/teamDetails/red_bull`);
    };

    const handleRaceDetails = () => {
        navigate(`/raceDetails/18`)
    };

    const navigate = useNavigate();

    return (
        <div className="component-wrapper">
            <h1>Extra Special Driver Details - 2024</h1>

            <div className="details-card">

                <img src="/driver-images/lizardson.jpg" alt="lizardson" width={250} />
                <div>
                    <p>Lizard Lizardson</p>
                    <div> <Flag country="SG" size={50} /></div>
                </div>
                <p>Nationality: Singaporean</p>
                <p>
                    Team: Red Bull
                </p>
                <p>Birth: 2006-04-20</p>
                <p>Biography: <a href="https://edition.cnn.com/2024/09/21/sport/f1-lizard-practice-singapore-spt-intl" target="_blank"><ExportOutlined /></a></p>

            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Round</th>
                        <th>Grand Prix</th>
                        <th>Team</th>
                        <th>Grid</th>
                        <th colSpan={2}>Position</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>18</td>
                        <td className="clickable" onClick={() => handleRaceDetails()}>
                            <div>
                                <Flag country="SG" />
                                <p>Singapore</p>
                            </div>
                        </td>
                        <td className="clickable"
                            onClick={() => handleClickDetails()}>
                            Red Bull
                        </td>
                        <td>26</td>
                        <td>
                            <div className="inner">
                                <p>25</p>
                                <span>
                                    <CaretUpOutlined style={{ color: "green" }} />
                                </span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}