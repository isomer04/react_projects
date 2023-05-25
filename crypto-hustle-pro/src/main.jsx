import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App.jsx";
import Layout from "./routes/Layout.jsx";
import DetailView from "./routes/DetailView.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index={true} path="/" element={<App />} />
        <Route
          index={false}
          path="/coinDetails/:symbol"
          element={<DetailView />}
        />
      </Route>
    </Routes>
  </BrowserRouter>
);
