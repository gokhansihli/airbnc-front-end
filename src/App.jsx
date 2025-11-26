import "./App.css";
import "./components/Header/Header.css";
import Logo from "./components/Header/Logo";
import Login from "./components/Header/Login";
import Footer from "./components/Footer/Footer";
import PropertiesGrid from "./components/Properties/PropertiesGrid";
import AuthProvider from "./Providers/AuthProvider";

import { Routes, Route } from "react-router";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <div className="Header">
          <Logo />

          <Login />
        </div>

        <Routes>
          <Route path="/" element={<PropertiesGrid />} />
        </Routes>
      </AuthProvider>
      <Footer />
    </div>
  );
}

export default App;
