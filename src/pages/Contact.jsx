// src/pages/Contact.jsx
import "bootstrap/dist/css/bootstrap.min.css";
import { FaMapMarkerAlt, FaPhone, FaWhatsapp } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="container my-5">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="display-5">Contact Us</h1>
        <hr style={{ width: "60px", margin: "auto" }} />
      </div>
      
      {/* Info Card */}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm p-3">
            <h3 className="mb-3">Nikhil Raut</h3>
            <ul className="list-unstyled mb-4">
              <li className="mb-2">
                <FaPhone /> <strong>Mobile:</strong>{" "}
                <a href="tel:9503492571" style={{ textDecoration: "none" }}>9503492571</a>
              </li>
              <li className="mb-2">
                <FaWhatsapp style={{ color: "#25D366" }} /> <strong>WhatsApp:</strong>{" "}
                <a
                  href="https://wa.me/919146834885"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#25D366", textDecoration: "none" }}
                >
                  9146834885 (Message Us)
                </a>
              </li>
              <li className="mb-2">
                <FaMapMarkerAlt style={{ color: "#E74C3C" }} /> <strong>Shop Location:</strong>
                <div>
                  Shree Cake Shop, Main Road, Talegaon Dabhade, Maharashtra, 410507
                </div>
              </li>
            </ul>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/919146834885?text=Hello%20Nikhil,%20I%20want%20to%20connect."
              className="btn btn-success mb-2"
              target="_blank"
              rel="noopener noreferrer"
              style={{ width: "100%" }}
            >
              <FaWhatsapp size={18} style={{ verticalAlign: "sub" }}/> Message on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Google Map Embed With Clickable Overlay */}
      <div className="row justify-content-center mt-4">
        <div className="col-md-8">
          <h5 className="text-center mb-2">Find Us On Map</h5>
          <div className="border rounded" style={{ overflow: "hidden", minHeight: "260px", position: "relative" }}>
            {/* Transparent clickable link over iframe */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=18.739950,73.677350"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                zIndex: 2,
                background: "rgba(0,0,0,0)",
                cursor: "pointer",
              }}
              title="Open in Google Maps"
            ></a>
            <iframe
              title="Shop Location"
              src="https://www.google.com/maps?q=18.739950,73.677350&output=embed"
              width="100%"
              height="260"
              frameBorder="0"
              style={{ border: 0, pointerEvents: "none" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
