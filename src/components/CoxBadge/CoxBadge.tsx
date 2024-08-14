import React from "react";
import "./index.css";

interface CoxBadgeProps {
    children?: React.ReactNode;
    className?: string;
}


export default function CoxBadge(props: CoxBadgeProps): React.ReactElement {
    const className = "CoxBadge" + (props.className ?? "");
    return <div className={className}>{props.children}</div>;
}
