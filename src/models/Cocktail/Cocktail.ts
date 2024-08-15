import {
    ICocktailData,
    IDrink,
    IDrinkData,
    IFilterListData,
    IIngredient,
    IIngredientData,
} from "@interfaces";
import CoxParser from "./CoxParser";
import CoxCache from "./CoxCache";

const apiUrl = "https://www.thecocktaildb.com/api/json/v1/1";
const apiResourceExt = ".php";

enum CoxFilterType {
    Alcoholic = "alcoholic",
    Category = "category",
    Glass = "glass",
    Ingredient = "ingredient",
}

const fetchData = async (url: string, retries = 3, timeout = 10000): Promise<ICocktailData> => {
    const signal = AbortSignal.timeout(timeout);
    return fetch(url, { signal })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .catch((err) => {
            if (retries > 0) {
                fetchData(url, retries - 1, timeout);
            }
            return err;
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
    return CoxParser.drinks(data.drinks as IDrinkData[]);
};

const getIngredients = async (resource: string, parameters?: string) => {
    const url = buildUrl(resource, parameters);
    const data = await fetchData(url);
    if (!isIngredientsData(data)) {
        throw new Error("Invalid data");
    }
    return CoxParser.ingredients(data.ingredients as IIngredientData[]);
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
    return CoxParser.filters(data.drinks as IFilterListData[]);
};

const drinkRandom = async () => {
    return getDrinks("random")
        .then((drinks) => {
            CoxCache.updateDrinks(drinks);
            return drinks[0];
        })
        .catch((error) => error);
};

const drinkById = async (id: number) => {
    const cached = CoxCache.getDrink(id) as IDrink | null;
    if (cached) {
        return cached;
    }

    const fetched = await getDrinks("lookup", `i=${id}`);
    CoxCache.updateDrinks(fetched);
    return fetched[0];
};

const drinksByName = async (name: string) => getDrinks("search", `s=${name}`);

const drinksByLetter = async (letter: string) => getDrinks("search", `f=${letter}`);

const drinksByIngredient = async (ingredient: string) => getDrinks("filter", `i=${ingredient}`);

const drinksByFilter = async (filter: CoxFilterType, property: string) =>
    getDrinks("filter", `${filter}=${property}`);

const ingredientById = async (id: number) => {
    const cached = CoxCache.getIngredient(id) as IIngredient | null;
    if (cached) {
        return cached;
    }

    const fetched = await getIngredients("lookup", `iid=${id}`);
    CoxCache.updateIngredients(fetched);
    return fetched[0];
};

const drinkRandomCache = (): Promise<IDrink> => {
    const cachedDrinks = CoxCache.getDrinks();
    if (cachedDrinks.length < 10) {
        return drinkRandom();
    }
    return Promise.resolve(cachedDrinks[Math.floor(Math.random() * cachedDrinks.length)]);
};

export const Cocktail = {
    drinkRandom,
    drinkRandomCache,
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
