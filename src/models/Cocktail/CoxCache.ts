import { IDrink, IIngredient } from "@interfaces/Cocktail";

const PREPEND = "cox_";

interface IHasId {
    id?: number;
}

const clearCache = (key: string) => sessionStorage.removeItem(PREPEND + key);

const setCache = <T>(key: string, value: T[]) => {
    if (!value.length) {
        return;
    }
    clearCache(key);
    sessionStorage.setItem(PREPEND + key, JSON.stringify(value));
};

const getCache = <T>(key: string): T[] => {
    const items = sessionStorage.getItem(PREPEND + key);
    return items ? JSON.parse(items) : [];
}

const getItem = <T extends IHasId>(key: string, id: number): T | null => {
    const items = getCache(key) as T[];
    return items.find(i => i.id === id) || null;
}

const updateCache = <T extends IHasId>(key: string, value: T[]) => {
    const current = getCache(key) as T[];
    value.forEach((item) => {
        const index = current.findIndex((c) => c.id === item.id);
        if (index > -1) {
            current[index] = { ...current[index], ...item };
        } else {
            current.push(item);
        }
    });
    setCache(key, current);
};

const removeItem = <T extends IHasId>(key: string, id: number) => {
    const current = getCache(key) as T[];
    const index = current.findIndex(i => i.id === id);
    if (index > -1) {
        current.splice(index, 1);
        setCache(key, current);
    }
}

const setDrinks = (drinks: IDrink[]) => setCache("drinks", drinks);
const getDrinks = (): IDrink[] => getCache("drinks");
const getDrink = (id: number): IDrink | null => getItem("drinks", id);
const updateDrinks = (drinks: IDrink[]) => updateCache("drinks", drinks);
const removeDrink = (id: number) => removeItem("drunks", id);
const clearDrinks = () => clearCache("drinks");

const setIngredients = (ingredients: IIngredient[]) => setCache("ingredients", ingredients);
const getIngredients = (): IIngredient[] => getCache("ingredients");
const getIngredient = (id: number): IIngredient | null => getItem("ingredients", id);
const updateIngredients = (ingredients: IIngredient[]) => updateCache("ingredients", ingredients);
const removeIngredient = (id: number) => removeItem("ingredients", id);
const clearIngredients = () => clearCache("ingredients");


const Cache = {
    getDrink,
    getDrinks,
    updateDrinks,
    setDrinks,
    removeDrink,
    clearDrinks,
    getIngredient,
    getIngredients,
    updateIngredients,
    setIngredients,
    removeIngredient,
    clearIngredients,
};

export default Cache;
