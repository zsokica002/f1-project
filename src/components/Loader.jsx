import { MoonLoader } from "react-spinners";

export default function Loader() {
    return (
        <div className="loader-container">

            <MoonLoader
                color="rgb(116, 0, 0)"
                size={200}
            />

        </div>
    );
}