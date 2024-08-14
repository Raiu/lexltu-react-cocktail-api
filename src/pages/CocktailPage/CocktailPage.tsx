import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Cocktail } from "@models";
import { IDrink } from "@interfaces";
import { Chip, Image } from "@nextui-org/react";

export default function CocktailPage() {
    const { idCox } = useParams();
    const [drink, setDrink] = useState<IDrink | null>(null);
    const navigate = useNavigate();
    const id = idCox ? parseInt(idCox) : null;

    useEffect(() => {
        if (!id || drink) {
            return;
        }

        Cocktail.drinkById(id)
            .then(setDrink)
            .catch((error) => {
                console.error(error);
                navigate("/404");
            });
    }, [id, drink, navigate]);

    console.log("Drink: ", drink);
    return (
        <div>
            {drink ? (
                <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
                    {/* <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"> */}
                    <div className="flex">
                        <Image
                            isBlurred
                            width={240}
                            src={drink.image}
                            alt={drink.name}
                            /* className="m-5" */
                        />
                        <div className="space-y-4">
                            <h1 className="text-4xl font-bold tracking-tight">Negroni</h1>
                            <p className="text-muted-foreground">Aperitif</p>
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
                                        <li>
                                            <span className="font-medium">Gin</span> - 1 oz
                                        </li>
                                        <li>
                                            <span className="font-medium">Sweet Vermouth</span> - 1
                                            oz
                                        </li>
                                        <li>
                                            <span className="font-medium">Campari</span> - 1 oz
                                        </li>
                                        <li>
                                            <span className="font-medium">Orange Slice</span> - for
                                            garnish
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-semibold">Serving</h2>
                                    <p className="mt-2 text-sm">
                                        Serve in a{" "}
                                        <span className="font-medium">Old Fashioned Glass</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2 space-y-4 lg:col-span-1">
                            <div>
                                <h2 className="text-2xl font-semibold">Instructions</h2>
                                <ol className="mt-2 space-y-2 text-sm">
                                    <li>Fill a mixing glass with ice cubes.</li>
                                    <li>Add the gin, sweet vermouth, and Campari.</li>
                                    <li>Stir until well-chilled, about 30 seconds.</li>
                                    <li>
                                        Strain into an old-fashioned glass filled with fresh ice.
                                    </li>
                                    <li>Garnish with an orange slice.</li>
                                </ol>
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold">History</h2>
                                <p className="mt-2 text-sm">
                                    The Negroni is a classic Italian cocktail that was created in
                                    Florence, Italy, in the early 1900s. It is said to have been
                                    invented by Count Camillo Negroni, who asked the bartender at
                                    Caffè Casoni to strengthen his Americano cocktail by replacing
                                    the soda water with gin.
                                </p>
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
