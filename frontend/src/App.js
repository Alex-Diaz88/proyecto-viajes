import "./App.css";

import NewTravelPage from "./pages/NewProductPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import Header from "./components/Header";
import { CustomTokenContextProvider } from "./contexts/TokenContext";

function App() {
  return (
    <div className="global_container">
      <BrowserRouter>
        <CustomTokenContextProvider>
          <Header />
          <main>
            <Routes>
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/travels/new" element={<NewTravelPage />} />
            </Routes>
          </main>
        </CustomTokenContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
