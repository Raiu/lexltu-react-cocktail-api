import { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Favorites } from "@models";
import { IDrink } from "@interfaces";
import { Button, Divider, Image } from "@nextui-org/react";
import { CloseIcon } from "@components/Icons/Close";

export default function FavoritesPage(): ReactElement {
    const [favorites, setFavorites] = useState<IDrink[]>([]);
    const navigate = useNavigate();

    const handleRemove = (drink: IDrink) => {
        Favorites.remove(drink);
        setFavorites(Favorites<IDrink>());
    }

    useEffect(() => {
        setFavorites(Favorites<IDrink>());
    }, [])

    return (
        <div>
            <div className="text-center mt-8">
                <h2 className="text-2xl font-bold">Favorites</h2>
            </div>

            <div className="search-results mt-8 mx-auto md:max-w-xl flex flex-col gap-4">
                {favorites &&
                    favorites.map((f, i, arr) => (
                        <div key={i}>
                            <div
                                className="flex gap-4 cursor-pointer items-center hover:bg-zinc-800 rounded-full"
                                onClick={() => navigate(`/drink/${f.id}`)}
                            >
                                <div>
                                    <Image src={f.image} alt={f.name} width={64} height={64} />
                                </div>
                                <div>{f.name}</div>
                                <div className="ml-auto mr-6">
                                    <Button color="danger" className="" isIconOnly onClick={() =>handleRemove(f)}>
                                        <CloseIcon className="" size="1.5rem" />
                                    </Button>
                                </div>
                            </div>
                            {i !== arr.length - 1 && <Divider key={i + "-divider"} />}
                        </div>
                    ))}
            </div>
        </div>
    );
}
