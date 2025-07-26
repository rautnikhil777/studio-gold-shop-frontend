// src/components/Footer.jsx

import { FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer-fixed">
      <div className="container">
        <div className="footer-btn-group justify-content-center">
          {/* WhatsApp Button */}
          <a
            href="https://wa.me/919146834885?text=Hello%20Nikhil%2C%20Main%20aapke%20products%20mein%20interest%20rakhta%20hoon."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-success d-inline-flex align-items-center"
            style={{ fontWeight: 500 }}
          >
            <FaWhatsapp size={18} style={{ marginRight: 6 }} />
            WhatsApp: 9146834885
          </a>
          {/* Map Button */}
          <a
            href="https://www.google.com/maps/search/?api=1&query=18.739950,73.677350"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-primary d-inline-flex align-items-center"
            style={{ fontWeight: 500 }}
          >
            <FaMapMarkerAlt size={16} style={{ marginRight: 5 }} />
            Open Map
          </a>
        </div>
      </div>
      <div className="text-center text-secondary small mt-1">
        &copy; {new Date().getFullYear()} MYShop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
