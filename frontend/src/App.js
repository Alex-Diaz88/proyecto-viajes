import "./App.css";
import NewTravelForm from "./components/NewTravelForm/index";
import { CustomTokenContextProvider } from "./contexts/TokenContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return <div className="App">
  <BrowserRouter>
  <CustomTokenContextProvider>
    <NewTravelForm/>
    </CustomTokenContextProvider>
    </BrowserRouter>
  </div>;
}

export default App;
