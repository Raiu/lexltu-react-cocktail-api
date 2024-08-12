import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { StartPage } from "@pages";
import { App } from "@/App";


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
            {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Route>
    )
)