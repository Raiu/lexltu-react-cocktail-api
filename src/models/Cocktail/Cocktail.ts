import { ICocktailData, IDrinkData, IFilterListData, IIngredientData } from "@interfaces";
import { Parser } from "./parser";
/* import Cache from "./cache"; */

const apiUrl = "https://www.thecocktaildb.com/api/json/v1/1";
const apiResourceExt = ".php";

enum CoxFilterType {
    Alcoholic = "alcoholic",
    Category = "category",
    Glass = "glass",
    Ingredient = "ingredient",
}

const fetchData = async (
    url: string,
    options?: RequestInit,
    retries = 3,
    timeout = 10000
): Promise<ICocktailData> => {
    return new Promise((resolve, reject) => {
        const controller = new AbortController();
        const timer = setTimeout(() => {
            controller.abort();
            reject(new Error("Request timed out"));
        }, timeout);

        fetch(url, {
            ...options,
            signal: controller.signal,
        })
            .then((response) => {
                clearTimeout(timer);
                if (!response.ok) {
                    reject(new Error(`HTTP error! status: ${response.status}`));
                }
                resolve(response.json());
            })
            .catch((error) => {
                clearTimeout(timer);
                if (retries > 0) {
                    fetchData(url, options, retries - 1, timeout)
                        .then(resolve)
                        .catch(reject);
                } else {
                    reject(error);
                }
            });
    });
};

const buildUrl = (resource: string, parameters?: string) => {
    return `${apiUrl}/${resource}${apiResourceExt}` + (parameters ? `?${parameters}` : "");
};

const isDrinksData = (data: ICocktailData) => {
    return data.drinks?.length && "idDrink" in data.drinks[0];
};

const isIngredientsData = (data: ICocktailData) => {
    return data.ingredients?.length && "idIngredient" in data.ingredients[0];
};

const isFilterListData = (data: ICocktailData) => {
    return data.drinks?.length && data.drinks.map((x) => Object.keys(x)).length > 0;
};

const getDrinks = async (resource: string, parameters?: string) => {
    const url = buildUrl(resource, parameters);
    const data = await fetchData(url);
    if (!isDrinksData(data)) {
        throw new Error("Invalid data");
    }
    return Parser.drinks(data.drinks as IDrinkData[]);
};

const getIngredients = async (resource: string, parameters?: string) => {
    const url = buildUrl(resource, parameters);
    const data = await fetchData(url);
    if (!isIngredientsData(data)) {
        throw new Error("Invalid data");
    }
    return Parser.ingredients(data.ingredients as IIngredientData[]);
};

const filtersByType = async (filter: CoxFilterType) => {
    const url = (() => {
        switch (filter) {
            case CoxFilterType.Alcoholic:
                return buildUrl("filter", "a=list");
            case CoxFilterType.Category:
                return buildUrl("filter", "c=list");
            case CoxFilterType.Glass:
                return buildUrl("filter", "g=list");
            case CoxFilterType.Ingredient:
                return buildUrl("filter", "i=list");
            default:
                throw new Error(`Unknown filter: ${filter}`);
        }
    })();
    const data = await fetchData(url);
    if (!isFilterListData(data)) {
        throw new Error("Invalid data");
    }
    return Parser.filters(data.drinks as IFilterListData[]);
};

const drinkRandom = async () => getDrinks("random").then((drinks) => drinks[0]);

const drinkById = async (id: number) => getDrinks("lookup", `i=${id}`).then((drinks) => drinks[0]);

const drinksByName = async (name: string) => getDrinks("search", `s=${name}`);

const drinksByLetter = async (letter: string) => getDrinks("search", `f=${letter}`);

const drinksByIngredient = async (ingredient: string) => getDrinks("filter", `i=${ingredient}`);

const drinksByFilter = async (filter: CoxFilterType, property: string) =>
    getDrinks("filter", `${filter}=${property}`);

const ingredientById = async (id: number) => getIngredients("lookup", `iid=${id}`);

export const Cocktail = {
    drinkRandom,
    drinkById,
    drinksByName,
    drinksByLetter,
    drinksByIngredient,
    drinksByFilter,
    ingredientById,
    filtersByType,
    getDrinks,
    getIngredients,
};
