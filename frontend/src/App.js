import "./App.css";

import NewTravelPage from "./pages/NewProductPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FrontPage from "./pages/FrontPage.js";
import RegisterPage from "./pages/RegisterPage";
import Header from "./components/Header";
import { CustomTokenContextProvider } from "./contexts/TokenContext";

function App() {
  return (
    <BrowserRouter>
      <CustomTokenContextProvider>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/travels/new" element={<NewTravelPage />} />
          </Routes>
        </main>
      </CustomTokenContextProvider>
    </BrowserRouter>
  );
}

export default App;