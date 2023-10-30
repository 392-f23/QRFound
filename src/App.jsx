import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import FoundPage from "./components/found/foundPage";
import QRPage from "./components/activation/QRPage";
import ActivatePage from "./ActivatePage";
import HomePage from './HomePage';
import "./App.css";
import { useProfile } from "./utilities/profile";

const App = () => {
  const [{ user, isAdmin, emailVerified }, profileLoading, profileError] = useProfile();

  return (
    <div className="app-div">
      <Router>
        <Header user={user} />
        <Routes>
          <Route path="/" element={<HomePage user={user} />} /> {/* Route for the HomePage */}
          <Route path="/activate" element={<ActivatePage />} />
          <Route path="found/:id" element={<FoundPage />} />
          <Route path="myqr/:id" element={<QRPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
