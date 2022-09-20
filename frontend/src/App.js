import "./App.css";
import NewTravelForm from "./components/NewTravelForm/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FrontPage from "./pages/FrontPage.js";
import RegisterPage from "./pages/RegisterPage";
import { CustomTokenContextProvider } from "./contexts/TokenContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CustomTokenContextProvider>
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </CustomTokenContextProvider>
      </BrowserRouter>
    </div>
  );

}

export default App;
