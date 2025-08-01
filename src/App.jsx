// src/App.jsx

import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import QrCodeComponent from "./components/QrCodeComponent";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Offers from "./pages/Offers";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div style={{ paddingTop: "66px", minHeight: "calc(100vh - 66px - 56px)" }}>
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Home />} />

          {/* Product Details (slug as :slug) */}
          <Route path="/product/:slug" element={<ProductDetails />} />

          {/* Contact Page */}
          <Route path="/contact" element={<Contact />} />

          {/* QR Code Page */}
          <Route path="/qr-code" element={<QrCodeComponent />} />

          {/* Offers Page */}
          <Route path="/offers" element={<Offers />} />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
