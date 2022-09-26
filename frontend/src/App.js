import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CustomTokenContextProvider } from "./contexts/TokenContext";
import { CustomAlertContextProvider } from "./contexts/AlertContext";
import Header from "./components/Header";
import Alert from "./components/Alert";
import FrontPage from "./pages/FrontPage/index.js";
import RegisterPage from "./pages/RegisterPage";
import NewTravelPage from "./pages/NewTravelPage";
import NotFoundPage from "./pages/NotFoundPage";
import SearchTravelsForm from "./components/SearchTravelsForm";
import TravelList from "./components/TravelList";
import { useState } from "react";
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
            <ButtonCheck/>
              <SearchTravelsForm setTravels={setTravels} />
              <TravelList travels={travels} />
              <RegisterForm />
              <NewTravelForm />

{/*                             <Alert />
              <Routes>
                <Route path="/" element={<FrontPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/travels/new" element={<NewTravelPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes> */}
            </main>
          </CustomAlertContextProvider>
        </CustomTokenContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
