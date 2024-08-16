import { ReactElement, ReactNode } from "react";

export default function Close({
    children,
    className,
    size,
}: {
    children?: ReactNode;
    className?: string;
    color?: string;
    size?: string;
}): ReactElement {
    const classNames = "fill-current " + className ?? null;
    const width = size ? size : "24px";
    const height = size ? size : "24px";

    return (
        <svg
            className={classNames}
            width={width}
            height={height}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M13.414 12l4.95-4.95a1 1 0 0 0-1.414-1.414L12 10.586l-4.95-4.95A1 1 0 0 0 5.636 7.05l4.95 4.95-4.95 4.95a1 1 0 0 0 1.414 1.414l4.95-4.95 4.95 4.95a1 1 0 0 0 1.414-1.414z" />
            {children}
        </svg>
    );
}
