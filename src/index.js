import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import App from "./components/App";
import Main from "./components/Main";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route path=":shipmentId" element={<Main />} />
            </Route>
        </Routes>
    </BrowserRouter>
);
