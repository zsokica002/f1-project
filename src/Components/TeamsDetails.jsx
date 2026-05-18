export default function TeamsDetails() {
    const [details, setDetails] = useState(null);



    useEffect(() => {
        getTeamsDetails();
    }, [])
