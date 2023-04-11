import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";


import CrewmateDetails from "./components/CrewmateDetails";

import CreateCrewmate from "./components/CreateCrewmate";
import CrewmateGallery from "./components/CrewmateGallery";


import Navigation from "./components/Navigation";
import "./index.css";


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<App />} />
         <Route path="/gallery" element={<CrewmateGallery />} />
        <Route path="/create" element={<CreateCrewmate />} /> 
        <Route path="/crewmates/:id" element={<CrewmateDetails />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
