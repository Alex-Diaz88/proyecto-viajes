import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CustomTokenContextProvider } from "./contexts/TokenContext";
import { CustomAlertContextProvider } from "./contexts/AlertContext";
import { useState } from "react";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/Header";
import Alert from "./components/Alert";

import TravelsPage from "./pages/TravelsPage";
import TravelPage from "./pages/TravelPage";
import RegisterPage from "./pages/RegisterPage";

import NewTravelPage from "./pages/NewTravelPage";

function App() {
  return (
    <div className="global_container">
      <BrowserRouter>
        <CustomTokenContextProvider>
          <CustomAlertContextProvider>
            <Header />

            <main>
              <Alert />
              <Routes>
                <Route path="/" element={<TravelsPage />} />
                <Route path="/travel" element={<TravelPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/travels/new" element={<NewTravelPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
          </CustomAlertContextProvider>
        </CustomTokenContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
