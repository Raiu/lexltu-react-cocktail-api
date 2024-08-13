import { IDrink, IIngredient } from "@interfaces";
import { parseCocktail } from "./Parser";

const apiUrl = "https://www.thecocktaildb.com/api/json/v1/1";
const apiResourceExt = ".php";

enum FilterType {
    Alcoholic = "alcoholic",
    Category = "category",
    Glass = "glass",
    Ingredient = "ingredient",
}

const buildUrl = (resource: string, parameters?: string) => {
    return `${apiUrl}/${resource}${apiResourceExt}` + (parameters ? `?${parameters}` : "");
};

const fetchData = async (url: string) => {
    const response = await fetch(url);
    return response.json();
};

const drinkRandom = async () => {
    const url = buildUrl("random");
    const data = await fetchData(url);
    return parseCocktail(data)[0] as IDrink;
};

const drinkById = async (id: number) => {
    const url = buildUrl("lookup", `i=${id}`)
    const data = await fetchData(url);
    console.log("DATA - drinkById: ", data);
    return parseCocktail(data)[0] as IDrink;
}

const drinksByName = async (name: string) => {
    const url = buildUrl("search", `s=${name}`)
    const data = await fetchData(url);
    console.log("DATA - drinksByName: ", data);
    return parseCocktail(data) as IDrink[];
}

const drinksByLetter = async (letter: string) => {
    const url = buildUrl("letter", `f=${letter}`)
    const data = await fetchData(url);
    console.log("DATA - drinksByLetter: ", data);
    return parseCocktail(data) as IDrink[];
}

const drinksByIngredient = async (ingredient: string) => {
    const url = buildUrl("filter", `i=${ingredient}`)
    const data = await fetchData(url);
    console.log("DATA - drinksByIngredient: ", data);
    return parseCocktail(data) as IDrink[];
}

const drinksByFilter = async (filter: FilterType, property: string) => {
    const url = (() => {
        switch (filter) {
            case FilterType.Alcoholic:
                return buildUrl("filter", `a=${property}`);
            case FilterType.Category:
                return buildUrl("filter", `c=${property}`);
            case FilterType.Glass:
                return buildUrl("filter", `g=${property}`);
            case FilterType.Ingredient:
                return buildUrl("filter", `i=${property}`);
            default:
                throw new Error(`Unknown filter: ${filter}`);
        }
    })();
    const data = await fetchData(url);
    return parseCocktail(data) as IDrink[];
}

const ingredientById = async (id: number) => {
    const url = buildUrl("lookup", `iid=${id}`)
    const data = await fetchData(url);
    return parseCocktail(data)[0] as IIngredient;
}

const listFilter = async (filter: FilterType) => {
    const url = (() => {
        switch (filter) {
            case FilterType.Alcoholic:
                return buildUrl("filter", "a=list");
            case FilterType.Category:
                return buildUrl("filter", "c=list");
            case FilterType.Glass:
                return buildUrl("filter", "g=list");
            case FilterType.Ingredient:
                return buildUrl("filter", "i=list");
            default:
                throw new Error(`Unknown filter: ${filter}`);
        }
    })();
    const data = await fetchData(url);
    return parseCocktail(data) as string[];
};

export const Cocktail = {
    drinkRandom,
    drinkById,
    drinksByName,
    drinksByLetter,
    drinksByIngredient,
    drinksByFilter,
    ingredientById,
    listFilter,
};
