import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import FrontPage from "./pages/FrontPage/index.js";
import RegisterPage from "./pages/RegisterPage";
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
          </Routes>
        </main>
      </CustomTokenContextProvider>
    </BrowserRouter>
  );
}

export default App;
