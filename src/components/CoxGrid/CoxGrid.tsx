import { ReactElement } from "react";

interface CoxGridProps {
    children: ReactElement;
}
export default function CoxGrid({ children }: CoxGridProps): ReactElement {
    return (
        <div>
            {children}
        </div>
    )
}