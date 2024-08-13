import { Outlet } from "react-router-dom";
import { Header, Footer } from "@components";
import { useConfig } from "@context";

export function App() {

    console.log("Config:", useConfig());
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
