import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo1 } from "../../static/crown.svg";
import "./footer.style.scss";

const Footer = () => {
  const GoogleMapEmbed = () => {
    return (
      <div className="google-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.4089124151014!2d3.3100515750646307!3d6.469773823785239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b893a152fc221%3A0xdd9d9b81efaecf30!2sVanilla%20Cottage%20Cakes!5e0!3m2!1sen!2sng!4v1693384218966!5m2!1sen!2sng"
          title="Google Map"
          width="100%"
          height="300"
          frameBorder="0"
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>
      </div>
    );
  };

  return (
    <body>
      <div style={{ marginTop: "80px", height: "200px", overflow: "hidden" }}>
        <GoogleMapEmbed />
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="Logo">
           
            <Link className="logo-link" to={"/"}>
              ISESEN
            </Link>
          </div>
          <div className="address">
            <h3 style={{ fontSize: "26px"}}>Our Address</h3>
            <p>1234 Example Street</p>
            <p>City, State ZIP</p>
          </div>
          <div className="legal-links">
            <h3 style={{ paddingLeft: "45px" ,  fontSize: "26px" }}>Legal</h3>
            <ul>
              <li>
                <a href="/terms">Terms and Conditions</a>
              </li>
              <li>
                <a href="/cookies">Cookies Policy</a>
              </li>
            </ul>
          </div>
          <div className="services">
            <h3 style={{ paddingLeft: "30px" ,  fontSize: "26px" }}>Services</h3>
            <ul>
              <li>
                <a href="/deliveries">Delivery Information</a>
              </li>
              <li>
                <a href="/returns">Returns and Exchanges</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2023 Your Company. All rights reserved.</p>
        </div>
      </footer>
    </body>
  );
};

export default Footer;
