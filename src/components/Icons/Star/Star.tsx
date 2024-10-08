import { ReactElement, ReactNode } from "react";

export default function Star({
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
            <path d="M16.948 20.2a1 1 0 0 1-.465-.115l-4.472-2.352-4.471 2.348a1 1 0 0 1-1.451-1.054l.854-4.979-3.619-3.527a1 1 0 0 1 .554-1.706l5-.727 2.237-4.531A1 1 0 0 1 12.011 3a1 1 0 0 1 .9.558l2.236 4.53 5 .727a1 1 0 0 1 .554 1.706l-3.621 3.526.854 4.98a1 1 0 0 1-.986 1.173zM6.171 10.5l2.544 2.479a1 1 0 0 1 .285.888l-.6 3.5 3.144-1.653a.993.993 0 0 1 .931 0l3.144 1.653-.6-3.5a1 1 0 0 1 .288-.885l2.544-2.482-3.515-.511a1 1 0 0 1-.752-.547l-1.573-3.183-1.573 3.186a1 1 0 0 1-.752.547z" />
            {children}
        </svg>
    );
}
