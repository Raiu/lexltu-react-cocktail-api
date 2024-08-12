import { useEffect, useState } from "react";
import { IDrink } from "@interfaces";
import { Cocktail } from "@models";
import { Card as CoxCard } from "@components/Card";

/* import { useConfig } from "@context"; */
/* import { buildUrl } from "@helpers"; */
/* interface IResponseData {
    drinks: IDrinkData[];
} */

export function StartPage() {
    const [drink, setDrink] = useState({} as IDrink);

    useEffect(() => {
        Cocktail.randomDrink()
            .then((drink) => {
                console.log("Drink:", drink);
                setDrink(drink);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <CoxCard>
            <h1>{drink.name}</h1>

            </CoxCard>
        </div>
    );
}