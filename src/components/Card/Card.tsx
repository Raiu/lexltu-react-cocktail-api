
interface ICardProps {
    children?: React.ReactNode;
}

export function Card({ children }: ICardProps) {

    return (
        <div className="card">
            {children}
        </div>
    )
}