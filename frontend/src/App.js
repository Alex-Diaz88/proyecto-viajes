import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CustomTokenContextProvider } from "./contexts/TokenContext";
import Header from "./components/Header";
import FrontPage from "./pages/FrontPage/index.js";
import RegisterPage from "./pages/RegisterPage";
import NewTravelPage from "./pages/NewProductPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CustomTokenContextProvider>
          <Header />
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/travels/new" element={<NewTravelPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </CustomTokenContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
