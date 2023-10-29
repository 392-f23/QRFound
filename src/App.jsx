import { useState } from "react";
import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import FoundPage from "./components/found/foundPage";
import QRPage from "./components/activation/QRPage";
import ActivatePage from "./ActivatePage";
import "./App.css";
import { useProfile } from "./utilities/profile";


const App = () => {
  const [{ user, isAdmin, emailVerified }, profileLoading, profileError] = useProfile();
  return (
    <div className="app-div">
      <Router>
      <Header user={user} />
        <Routes>
          <Route path="/activate" element={<ActivatePage></ActivatePage>} />
          <Route path="found/:id" element={<FoundPage></FoundPage>} />
          <Route path="myqr/:id" element={<QRPage></QRPage>} />
        </Routes>
        <Footer></Footer>
      </Router>
    </div>
  );
};

export default App;
