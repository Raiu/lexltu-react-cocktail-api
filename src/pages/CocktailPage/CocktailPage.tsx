import { ReactElement, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Cocktail } from "@models";
import { IDrink } from "@interfaces";
import { Chip, Image } from "@nextui-org/react";

/* interface ICocktailPageProps {} */

export default function CocktailPage(): ReactElement {
    const { idCox } = useParams();
    const [drink, setDrink] = useState<IDrink | null>(null);
    const navigate = useNavigate();
    const id = idCox ? parseInt(idCox) : null;

    useEffect(() => {
        if (!id || drink) return;

        Cocktail.drinkById(id)
            .then(setDrink)
            .catch((error) => {
                console.error(error);
                navigate("/404");
            });
    }, [id, drink, navigate]);

    return (
        <div>
            {drink ? (
                <div className="container mx-auto md:w-10/12 py-8 px-8">
                    <div className="grid md:grid-cols-2 gap-8 items-center justify-center">
                        <div className="flex md:flex-row-reverse">
                            <figure className="text-right md:max-w-96 md:max-h-96">
                                <Image
                                    removeWrapper
                                    isBlurred
                                    src={drink.image}
                                    alt={drink.name}
                                    className="w-full h-full"
                                />
                            </figure>
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-4xl font-bold tracking-tight">{drink.name}</h1>
                            <p className="text-muted-foreground">{drink.category}</p>
                            <div>
                                <div className="mt-2 flex flex-wrap gap-2 text-sm">
                                    {drink.tags.map((tag, i) => (
                                        <Chip key={i}>{tag}</Chip>
                                    ))}
                                </div>
                            </div>
                            <div className="grid gap-4">
                                <div>
                                    <h2 className="text-2xl font-semibold">Ingredients</h2>
                                    <ul className="mt-2 space-y-2 text-sm">
                                        {drink.ingredients.map((item, i) => (
                                            <li key={i}>
                                                <span>
                                                    {item.name} - {item.measure}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-semibold">Glass</h2>
                                    <p className="mt-2 text-sm">
                                        Serve in a <span className="font-bold">{drink.glass}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="md:max-w-lg md:col-span-2 md:place-self-center space-y-4">
                            <div>
                                <h2 className="text-2xl font-semibold">Instructions</h2>
                                <p className="mt-2 space-y-2 text-sm">{drink.instructions}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}
