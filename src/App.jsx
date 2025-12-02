import "./App.css";
import "./components/Header/Header.css";
import Logo from "./components/Header/Logo";
import Login from "./components/Header/Login";
import Footer from "./components/Footer/Footer";
import PropertiesGrid from "./components/Properties/PropertiesGrid";
import Property from "./components/PropertyDetails/Property";
import Booking from "./components/Booking/Booking";
import User from "./components/User/User";
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
          <Route path="/properties/:id" element={<Property />} />
          <Route path="/properties/:id/booking" element={<Booking />} />
          <Route path="/users/:id" element={<User />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
