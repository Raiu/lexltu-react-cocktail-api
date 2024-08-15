import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "@/router";
import { ConfigProvider } from "@context";
import { NextUIProvider } from "@nextui-org/react";

import "./index.css";
/* import "@/css/index.css"; */

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ConfigProvider configPath="/src/config.json">
            <NextUIProvider>
                <RouterProvider router={router} />
            </NextUIProvider>
        </ConfigProvider>
    </React.StrictMode>
);
