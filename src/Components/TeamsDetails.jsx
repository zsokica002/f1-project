import { useState } from "react";

export default function TeamsDetails() {
    const [teamsDetails, setTeamsDetails] = useState(null);



    useEffect(() => {
        getTeamsDetails();
    }, [])
