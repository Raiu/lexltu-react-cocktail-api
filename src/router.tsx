import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { StartPage } from "@pages";
import { App } from "@/App";
import SearchPage from "@pages/SearchPage/SearchPage";
import CocktailPage from "@pages/CocktailPage/CocktailPage";
import FavoritesPage from "@pages/FavoritesPage/FavoritesPage";


/* export function Router() {
    return ( 
        <BrowserRouter>
        </BrowserRouter>
    )
} */

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index element={<StartPage />} />
            <Route path="home" element={<StartPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="drink/:idCox" element={<CocktailPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
            {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Route>
    )
)