import { Link } from "react-router";

export default function Breadcrumbs(props) {

    return (
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                {props.items.map((item, i) => {
                    const isLast = i === props.items.length - 1;
                    return (
                        <li key={i}>
                            {
                                !isLast ?
                                    <Link to={item.route}>{item.label}</Link>
                                    : <span>{item.label}</span>
                            }
                        </li>
                    );
                })}

            </ul>
        </div>
    );
}
