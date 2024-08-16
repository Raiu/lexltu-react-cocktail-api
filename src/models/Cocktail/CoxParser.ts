import {
    Alcoholic,
    IDrink,
    IDrinkData,
    IFilterListData,
    IIngredient,
    IIngredientData,
} from "@interfaces/Cocktail";

const parseDrinks = (drinks: IDrinkData[]): IDrink[] =>
    drinks
        ? drinks.map((item) => {
              const ingredients = Array.from({ length: 15 }, (_, i) => {
                  const name = item[`strIngredient${i + 1}` as keyof IDrinkData];
                  const measure = item[`strMeasure${i + 1}` as keyof IDrinkData];
                  return { name, measure };
              }).filter((x) => x.name || x.measure) as { name: string; measure: string }[];

              const alcoholic = (() => {
                  switch (item.strAlcoholic) {
                      case "Alcoholic":
                          return Alcoholic.Alcohol;
                      case "Optional alcohol":
                          return Alcoholic.Optional;
                      case "Non alcoholic":
                          return Alcoholic.None;
                      default:
                          return Alcoholic.Unknown;
                  }
              })();

              return {
                  id: parseInt(item.idDrink, 10),
                  name: item.strDrink ?? "No name",
                  category: item.strCategory ?? "",
                  tags: item.strTags?.split(",") ?? [],
                  iba: item.strIBA ?? "",
                  alcoholic,
                  glass: item.strGlass ?? "",
                  instructions: item.strInstructions ?? "",
                  ingredients,
                  image: item.strDrinkThumb ?? "",
                  imageSource: item.strImageSource ?? "",
                  imageAttribution: item.strImageAttribution ?? "",
                  modified: item.dateModified ? new Date(item.dateModified) : new Date(),
              };
          })
        : [];

const parseIngredients = (ingredients: IIngredientData[]): IIngredient[] =>
    ingredients
        ? ingredients.map((item) => ({
              id: parseInt(item.idIngredient, 10),
              name: item.strIngredient ?? "No name",
              description: item.strDescription ?? "",
              type: item.strType ?? "",
              alcohol: item.strAlcohol?.toLowerCase() === "yes",
              abv: item.strABV ?? "",
          }))
        : [];

const parseFilters = (filters: IFilterListData[]): string[] =>
    filters.map((item) => Object.values(item)[0]);

const CoxParser = {
    drinks: parseDrinks,
    ingredients: parseIngredients,
    filters: parseFilters,
};

export default CoxParser;
