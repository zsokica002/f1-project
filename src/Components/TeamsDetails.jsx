import { useState, useEffect } from "react";
import Loader from "./Loader";
import axios from "axios";
import { useNavigate, useParams } from "react-router";



export default function TeamsDetails() {
    
    // const [teamsResults,setTeamsResults] = useState(null)
    
    
    
    const [teamsDetails, setTeamsDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const navigate = useNavigate();


    // useEffect(() => {
    //     getTeamsresults();
    // }, [])

    // const getTeamsResults = async () => {
    //     const url = `https://api.jolpi.ca/ergast/f1/2025/constructors/${params.id}/results.json`;


    //     const response = await axios.get(url);
    //     console.log(response.data.MRData.total);
    //     setTeamsResults(response.data);
    //     setLoading(false);
    // };


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

    return (
        <>
            <div>
                
            {/* <p>total:{response.data.MRData.total} </p> */}

            </div>


            <p>Teams details</p>
            <a target="_blank" href={teamsDetails.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0].Constructor.url}>wiki</a>

        </>



    )




}