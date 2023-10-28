import { useState } from "react";
import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Found from "./components/found/Found";
import ActivatePage from "./ActivatePage";
import "./App.css";

const App = () => {
  return (
    <div className="app-div">
      <Router>
        <Header/>
        <Routes>
          <Route path="/activate" element={<ActivatePage></ActivatePage>} />
          <Route path="item/:id" element={<Found></Found>} />
        </Routes>
        <Footer></Footer>
      </Router>
    </div>
  );
};

export default App;
