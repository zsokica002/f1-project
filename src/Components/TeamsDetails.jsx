import { useState, useEffect } from "react";
import Loader from "./Loader";
import axios from "axios";
<<<<<<< HEAD
import {useNavigate, useParams} from "react-router";
=======
import { useNavigate, useParams } from "react-router";
>>>>>>> 563277c8016f66b4d1f1eef1888c6d1fb327aa40

export default function TeamsDetails() {
    const [teamsDetails, setTeamsDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getTeamsDetails();
    }, [])

    const getTeamsDetails = async () => {
        const url = `https://api.jolpi.ca/ergast/f1/2025/constructors/${params.id}/constructorStandings.json`;


        const response = await axios.get(url);
        console.log(response.data.MRData.StandingsTable.StandingsLists);
        setTeamsDetails(response.data);
        //setTeamsDetails(Object.values(response.data))
        setLoading(false);
    };


    if (loading) {
        return <Loader />;
    }

const navigate = useNavigate();
    return (
        <>
            <p>Teams details</p>
            <a target="_blank" href={teamsDetails.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0].Constructor.url}>wiki</a>

        </>



    )




}