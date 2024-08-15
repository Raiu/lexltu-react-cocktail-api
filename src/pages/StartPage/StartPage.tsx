import { useCallback, useEffect, useState } from "react";
import { IDrink } from "@interfaces";
import { Cocktail } from "@models";

import { Image, Card, CardHeader,  CardFooter, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export function StartPage() {
    const [drink, setDrink] = useState({} as IDrink);
    const [surprise, setSurprise] = useState([] as IDrink[]);
    /* const [isLoading, setIsLoading] = useState(false); */
    const navigate = useNavigate();

    useEffect(() => {
        if (drink?.id) {
            return;
        }
        Cocktail.drinkRandom()
            .then((drink) => {
                console.log("Drink:", drink.name);
                setDrink(drink);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                /* setIsLoading(false); */
            });
    });

    const loadSurprise = useCallback(async () => {
        /* setIsLoading(true); */
        const drinks = await Promise.all([...Array(6)].map(() => Cocktail.drinkRandomCache()));
        setSurprise(drinks);
    }, []);

    return (
        <div className="content">
            <div className="container cox-showcase flex justify-center mx-auto md:px-20 md:py-10  gap-8">
                <figure className="">
                    <Image isBlurred width={400} src={drink.image} alt={drink.name} />
                </figure>
                <div className="flex flex-col max-w-md pt-8">
                    <h2 className="text-5xl tracking-tight font-extrabold leading-10 mb-2 capitalize ">
                        {drink.name}
                    </h2>
                    <p className="text-base font-semibold mb-2 pl-2 capitalize ">
                        {drink.category}
                    </p>
                    <p className="text-base">{drink.instructions}</p>
                    <Button size="md" className="mt-4 w-fit" onClick={() => navigate(`/drink/${drink.id}`)}>
                        See more
                    </Button>
                </div>
            </div>

            <div className="surprise my-8 flex justify-center">
                <Button size="lg" color="danger" onClick={loadSurprise}>
                    Surprise Me
                </Button>
            </div>
            <div className="container mx-auto max-w-4xl flex flex-wrap gap-4 justify-center">
                {surprise &&
                    surprise.map((x, i) => (
                        <Card key={i} isFooterBlurred className="w-64 h-64 shadow-inner">
                            <CardHeader className="flex-col pl-4 absolute z-10 bg-zinc-900/50 items-start">
                                <p className="text-xs text-white/60 uppercase font-semibold">
                                    {x.category}
                                </p>
                                <h4 className="text-white font-bold text-base">{x.name}</h4>
                            </CardHeader>
                            <Image
                                removeWrapper
                                alt={x.name}
                                className="object-cover size-full z-0 "
                                src={x.image}
                            />
                            <CardFooter className="absolute z-10 bottom-0 flex-row-reverse">
                                <Button
                                    size="sm"
                                    className=""
                                    onClick={() => navigate(`/drink/${x.id}`)}
                                >
                                    See more
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
            </div>
        </div>
    );
}
