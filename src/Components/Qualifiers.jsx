import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function Qualifiers() {

    const [qualis, setQualis] = useState([]);
    const [loading, setLoading] = useState(true);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getQualis();
    }, [])

    const getQualis = async () => {
        const url = `https://api.jolpi.ca/ergast/f1/2025/${params.id}/qualifying.json`;
        const response = await axios.get(url);
        setQualis(response.data.MRData.RaceTable.Races[0].QualifyingResults);
        console.log(response.data.MRData.RaceTable.Races[0].QualifyingResults);
    }

    const bestTime = () => {
        // const q1 = 
    };


    return (
        <>

            <h3>Hello from quali component!</h3>

            <table>
                <thead>
                    <tr>
                        <th>Pos</th>
                        <th>Driver</th>
                        <th>Team</th>
                        <th>Best Time</th>
                    </tr>
                </thead>
                <tbody>

                    {qualis.map((quali, i) => {
                        return (
                            <tr key={i}>
                                <td>{quali.position}</td>
                                <td>{quali.Driver.familyName}</td>
                                <td>{quali.Constructor.name}</td>
                                <td>{ }</td>
                            </tr>
                        );
                    })}

                </tbody>
            </table>






        </>
    );
}
