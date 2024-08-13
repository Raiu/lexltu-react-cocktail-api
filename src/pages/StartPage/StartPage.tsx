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
        Cocktail.drinkRandom()
            .then((drink) => {
                console.log("Drink:", drink);
                setDrink(drink);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        Cocktail.drinkById(1)
            .then((drink) => {
                console.log("Drink by id:", drink);
            })
            .catch((error) => {
                console.log("drinkById: ")
                console.error(error);
            });
    }, []);

    useEffect(() => {
        Cocktail.drinksByName("Martini")
            .then((drinks) => {
                console.log("Drinks by name:", drinks);
            })
            .catch((error) => {
                console.log("drinksByName: ")
                console.error(error);
            });
    }, []);

    useEffect(() => {
        Cocktail.drinksByLetter("M")
            .then((drinks) => {
                console.log("Drinks by letter:", drinks);
            })
            .catch((error) => {
                console.log("drinksByLetter: ")
                console.error(error);
            });
    }, []);

    useEffect(() => {
        Cocktail.drinksByIngredient("Gin")
            .then((drinks) => {
                console.log("Drinks by ingredient:", drinks);
            })
            .catch((error) => {
                console.log("drinksByIngredient: ")
                console.error(error);
            });
    }, []);

    return (
        <div>
            <CoxCard title={drink.name} img={drink.image}>
            <h1>{drink.name}</h1>

            </CoxCard>
        </div>
    );
}