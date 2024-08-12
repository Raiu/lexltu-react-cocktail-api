import {
    IDrinkData,
    IDrink,
    Alcoholic,
    IIngredientData,
    IIngredient,
    CocktailData,
    ParsedCocktail,
} from "@interfaces/Cocktail";

const parseDrink = (data: IDrinkData): IDrink => {
    if (!data.idDrink) {
        return {} as IDrink;
    }

    const ingredients: { name: string; measure: string }[] = [];
    for (let i = 1; i <= 15; i++) {
        const name = data[`strIngredient${i}` as keyof IDrinkData];
        const measure = data[`strMeasure${i}` as keyof IDrinkData];
        if (!name || !measure) {
            break;
        }
        ingredients.push({ name, measure });
    }

    const alcoholic = (() => {
        switch (data.strAlcoholic) {
            case "Alcoholic":
                return Alcoholic.Alcohol;
            case "Optional alcohol":
                return Alcoholic.Optional;
            case "Non alcoholic":
                return Alcoholic.None;
            default:
                throw new Error(`Unknown alcoholic type: ${data.strAlcoholic}`);
        }
    })();

    return {
        id: parseInt(data.idDrink),
        name: data.strDrink ? data.strDrink : "No name",
        category: data.strCategory,
        tags: data.strTags ? data.strTags.split(",") : [],
        iba: data.strIBA ? data.strIBA : "",
        alcoholic,
        glass: data.strGlass,
        ingredients,
        image: data.strDrinkThumb,
        imageSource: data.strImageSource ? data.strImageSource : "",
        imageAttribution: data.strImageAttribution ? data.strImageAttribution : "",
        modified: new Date(data.dateModified),
    };
};

const parseIngredient = (data: IIngredientData): IIngredient => {
    return {
        id: parseInt(data.idIngredient),
        name: data.strIngredient ? data.strIngredient : "No name",
        description: data.strDescription ? data.strDescription : "",
        type: data.strType ? data.strType : "",
        alcohol: data.strAlcohol == "yes" ? true : false,
        abv: data.strABV ? data.strABV : "",
    };
};

interface ICocktailData {
    drinks: CocktailData[];
}

export const parseCocktail = ({ drinks }: ICocktailData): ParsedCocktail => {
    return (() => {
        switch (true) {
            case "idDrink" in drinks[0]:
                return drinks.map((item) => parseDrink(item as IDrinkData)) as IDrink[];

            case "idIngredient" in drinks[0]:
                return drinks.map((item) =>
                    parseIngredient(item as IIngredientData)
                ) as IIngredient[];

            case "strAlcoholic" in drinks[0]:
            case "strCategory" in drinks[0]:
            case "strGlass" in drinks[0]:
            case "strIngredient1" in drinks[0]:
                return drinks.map((item) => Object.values(item)[0]) as string[];
        }
    })() as ParsedCocktail;
};

/* export const parseCocktail = ({ drinks }: ICocktailData): ParsedCocktail => {
    let parsed: TParsedDrinks = [];

    if (!drinks) {
        return parsed;
    }

    switch (true) {
        case "idDrink" in drinks[0]:
            parsed = drinks.map((item) => parseDrink(item as IDrinkData));
            break;
        case "idIngredient" in drinks[0]:
            parsed = drinks.map((item) => parseIngredient(item as IIngredientData));
            break;
        case "strAlcoholic" in drinks[0]:
        case "strCategory" in drinks[0]:
        case "strGlass" in drinks[0]:
        case "strIngredient1" in drinks[0]:
            parsed = drinks.map((item) => Object.values(item)[0]) as string[];
            break;
    }

    return parsed;
}; */

/* const parseDrinkData = (data: IDrinkData): IDrink => {
    if (!data.idDrink) {
        return {} as IDrink;
    }

    const ingredients: { name: string; measure: string }[] = [];
    for (let i = 1; i <= 15; i++) {
        const name = data[`strIngredient${i}` as keyof IDrinkData];
        const measure = data[`strMeasure${i}` as keyof IDrinkData];
        if (!name || !measure) {
            break;
        }
        ingredients.push({ name, measure });
    }

    const alcoholic = (() => {
        switch (data.strAlcoholic) {
            case "Alcoholic":
                return Alcoholic.Alcohol;
            case "Optional alcohol":
                return Alcoholic.Optional;
            case "Non alcoholic":
                return Alcoholic.None;
            default:
                throw new Error(`Unknown alcoholic type: ${data.strAlcoholic}`);
        }
    })();

    return {
        id: parseInt(data.idDrink),
        name: data.strDrink ? data.strDrink : "No name",
        category: data.strCategory,
        tags: data.strTags ? data.strTags.split(",") : [],
        iba: data.strIBA ? data.strIBA : "",
        alcoholic,
        glass: data.strGlass,
        ingredients,
        image: data.strDrinkThumb,
        imageSource: data.strImageSource ? data.strImageSource : "",
        imageAttribution: data.strImageAttribution ? data.strImageAttribution : "",
        modified: new Date(data.dateModified),
    };
}; */
