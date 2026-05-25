import { Link } from "react-router";

export default function Breadcrumbs(props) {

    return (
        <div className="breadcrumbs">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li>&gt;</li>
                {props.items.map((item, i) => {
                    const isLast = i === props.items.length - 1;
                    return (
                        <div key={i}>
                            <li>
                                {
                                    !isLast ?
                                        <Link to={item.route}>{item.label}</Link>
                                        : <span>{item.label}</span>
                                }
                            </li>
                            <li>{!isLast ? ">" : null}</li>
                        </div>

                    );
                })}

            </ul>
        </div>
    );
}
