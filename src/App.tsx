import { Outlet } from "react-router-dom";
import { Header, Footer } from "@components";
import { useConfig } from "@context";

export function App() {

    console.log("Config:", useConfig());
    return (
        <>
        <div className="">
            <Header />
            <main className="dark text-foreground bg-background">
                <Outlet />
            </main>
            <Footer />

        </div>
        </>
    );
}
