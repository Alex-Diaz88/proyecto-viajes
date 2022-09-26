import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CustomTokenContextProvider } from "./contexts/TokenContext";
import { CustomAlertContextProvider } from "./contexts/AlertContext";
import TravelsPage from "./pages/TravelsPage";
import TravelPage from "./pages/TravelPage";
import RegisterPage from "./pages/RegisterPage";

import Header from "./components/Header";
import Alert from "./components/Alert";
import NewTravelPage from "./pages/NewTravelPage";
import NotFoundPage from "./pages/NotFoundPage";
import SearchTravelsForm from "./components/SearchTravelsForm";
import TravelList from "./components/TravelList";
import RegisterForm from "./components/RegisterForm";
import ButtonCheck from "./components/ButtonCheck";
import NewTravelForm from "./components/NewTravelForm";

function App() {
  const [travels, setTravels] = useState([]);

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
