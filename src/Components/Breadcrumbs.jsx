import { Link } from "react-router";

export default function Breadcrumbs(props) {

    return (
        <div className="breadcrumbs">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                    <span> &gt; </span>
                </li>
                {props.items.map((item, i) => {
                    const isLast = i === props.items.length - 1;
                    return (
                        <li key={i}>
                            <div>
                                {
                                    !isLast ?
                                        <Link to={item.route}>{item.label}</Link> :
                                        <span>{item.label}</span>
                                }
                                <span>{!isLast ? " > " : null}</span>
                            </div>
                        </li>
                    );
                })}

            </ul>
        </div>
    );
}
