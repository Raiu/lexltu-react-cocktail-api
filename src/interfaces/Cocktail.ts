export enum Alcoholic {
    Alcohol = "Alcoholic",
    Optional = "Optional alcohol",
    None = "Non alcoholic",
    Unknown = "Unknown",
}

export interface IDrink {
    id: number;
    name: string;
    category: string;
    tags: string[];
    iba: string;
    alcoholic: Alcoholic;
    glass: string;
    instructions: string;
    ingredients: { name: string; measure: string }[];
    image: string;
    imageSource: string;
    imageAttribution: string;
    modified: Date;
}

export interface IIngredient {
    id: number;
    name: string;
    description: string;
    type: string;
    alcohol: boolean;
    abv: string;
}

export type CocktailData = IDrinkData | IIngredientData | IFilterListData;

export interface ICocktailData {
    drinks?: IDrinkData[] | IFilterListData[];
    ingredients?: IIngredientData[];
}

export interface IDrinkData {
    idDrink: string;
    strDrink: string;
    strDrinkAlternate: string | null;
    strTags: string | null;
    strVideo: string | null;
    strCategory: string;
    strIBA: string | null;
    strAlcoholic: string;
    strGlass: string;
    strInstructions: string;
    strDrinkThumb: string;
    strIngredient1: string | null;
    strIngredient2: string | null;
    strIngredient3: string | null;
    strIngredient4: string | null;
    strIngredient5: string | null;
    strIngredient6: string | null;
    strIngredient7: string | null;
    strIngredient8: string | null;
    strIngredient9: string | null;
    strIngredient10: string | null;
    strIngredient11: string | null;
    strIngredient12: string | null;
    strIngredient13: string | null;
    strIngredient14: string | null;
    strIngredient15: string | null;
    strMeasure1: string | null;
    strMeasure2: string | null;
    strMeasure3: string | null;
    strMeasure4: string | null;
    strMeasure5: string | null;
    strMeasure6: string | null;
    strMeasure7: string | null;
    strMeasure8: string | null;
    strMeasure9: string | null;
    strMeasure10: string | null;
    strMeasure11: string | null;
    strMeasure12: string | null;
    strMeasure13: string | null;
    strMeasure14: string | null;
    strMeasure15: string | null;
    strImageSource: string | null;
    strImageAttribution: string | null;
    strCreativeCommonsConfirmed: string;
    dateModified: string;
}

export interface IIngredientData {
    idIngredient: string;
    strIngredient: string | null;
    strDescription: string | null;
    strType: string | null;
    strAlcohol: string | null;
    strABV: string | null;
}

export interface IFilterListData {
    strAlcoholic?: string;
    strCategory?: string;
    strGlass?: string;
    strIngredient1?: string;
}



export type ParsedCocktail = IDrink[] | IIngredient[] | string[];