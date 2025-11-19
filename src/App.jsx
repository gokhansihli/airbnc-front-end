import "./App.css";
import "./components/Header/Header.css";
import Logo from "./components/Header/Logo";
import UserDrop from "./components/Header/userDrop";
import Footer from "./components/Footer";
import PropertiesGrid from "./components/Properties/PropertiesGrid";

import { Routes, Route } from "react-router";

function App() {
  return (
    <div className="App">
      <div className="Header">
        <Logo />
        <UserDrop />
      </div>

      <Routes>
        <Route path="/" element={<PropertiesGrid />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
