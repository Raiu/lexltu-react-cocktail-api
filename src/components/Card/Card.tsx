
interface ICardProps {
    children?: React.ReactNode;
    className?: string;
    title?: string;
    img?: string;
    label?: string;
}

import './index.css';

export function Card(props: ICardProps) {

    return (
        <div className={"card" + props.className ?? ""}>
            <figure className="card-img">
                {props.img ? <img src={props.img} alt={props.title} /> : null }
            </figure>
            {props.children}
        </div>
    )
}