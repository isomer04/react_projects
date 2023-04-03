import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";
import Details from "./components/Details";
import Navigation from "./components/Navigation";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
