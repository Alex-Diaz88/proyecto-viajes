import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CustomTokenContextProvider } from "./contexts/TokenContext";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/Header";
import ProfilePage from "./pages/ProfilePage";

import TravelsPage from "./pages/TravelsPage";
import TravelPage from "./pages/TravelPage";
import RegisterPage from "./pages/RegisterPage";
import NewTravelPage from "./pages/NewTravelPage";

function App() {
  return (
    <div className="global_container">
      <BrowserRouter>
        <CustomTokenContextProvider>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<TravelsPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile/:userId" element={<ProfilePage />} />
              <Route path="/travel" element={<TravelPage />} />
              <Route path="/travels/new" element={<NewTravelPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <ToastContainer position="bottom-center" theme="dark" />
        </CustomTokenContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
