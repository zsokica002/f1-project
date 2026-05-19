import { MoonLoader } from "react-spinners";

export default function Loader() {
    return (
        <div className="loader-container">

            <MoonLoader
                color="#cd2c2c"
                size={200}
            />

        </div>
    );
}