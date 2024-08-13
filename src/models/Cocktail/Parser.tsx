import {
    Alcoholic,
    CocktailData,
    IDrink,
    IDrinkData,
    IIngredient,
    IIngredientData,
    ParsedCocktail,
} from "@interfaces/Cocktail";

const parseDrink = (data: IDrinkData): IDrink => {
    const ingredients = Array.from({length: 15}, (_, i) => {
        const name = data[`strIngredient${i + 1}` as keyof IDrinkData];
        const measure = data[`strMeasure${i + 1}` as keyof IDrinkData];
        return { name, measure };
    }).filter((x) => x.name || x.measure) as { name: string; measure: string }[];

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
        id: parseInt(data.idDrink, 10),
        name: data.strDrink ?? "No name",
        category: data.strCategory ?? "",
        tags: data.strTags?.split(",") ?? [],
        iba: data.strIBA ?? "",
        alcoholic,
        glass: data.strGlass ?? "",
        ingredients,
        image: data.strDrinkThumb ?? "",
        imageSource: data.strImageSource ?? "",
        imageAttribution: data.strImageAttribution ?? "",
        modified: new Date(data.dateModified),
    };
};

const parseIngredient = (data: IIngredientData): IIngredient => ({
    id: parseInt(data.idIngredient, 10),
    name: data.strIngredient ?? "No name",
    description: data.strDescription ?? "",
    type: data.strType ?? "",
    alcohol: data.strAlcohol?.toLowerCase() === "yes",
    abv: data.strABV ?? "",
});

export const parseCocktail = ({ drinks }: { drinks: CocktailData[] }): ParsedCocktail =>
    (() => {
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
            default:
                throw new Error("Unknown cocktail data");
        }
    })() as ParsedCocktail;
