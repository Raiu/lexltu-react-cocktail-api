import { IDrink } from "@interfaces";
import { parseCocktail } from "./Parser";

const apiUrl = "https://www.thecocktaildb.com/api/json/v1/1";
const apiResourceExt = ".php";

const buildUrl = (resource: string, parameters?: string) => {
    return `${apiUrl}/${resource}${apiResourceExt}` + (parameters ? `?${parameters}` : "");
};

const fetchData = async (url: string) => {
    console.log("Fetching data from:", url);
    const response = await fetch(url);
    return response.json();
};

const randomDrink = async () => {
    const url = buildUrl("random");
    const data = await fetchData(url);
    return parseCocktail(data)[0] as IDrink;
};

const listFilter = async (property: string) => {
    const url = (() => {
        switch (property) {
            case "alcoholic":
                return buildUrl("filter", "a=list");
            case "categories":
                return buildUrl("filter", "c=list");
            case "glasses":
                return buildUrl("filter", "g=list");
            case "ingredients":
                return buildUrl("filter", "i=list");
            default:
                throw new Error(`Unknown filter: ${property}`);
        }
    })();

    const data = await fetchData(url);
    return parseCocktail(data) as string[];
};

export const Cocktail = {
    randomDrink,
    listFilter,
};
