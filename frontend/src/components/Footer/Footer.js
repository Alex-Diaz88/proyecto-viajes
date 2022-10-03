import React from "react";
import "./styles.css";
import logo from "../../assets/images/logo.png";

function Footer() {
  return (
    <div className="main-footer">
      <div className="row1">
        <div className="col1">
          <img src={logo} alt="iconos redes sociales" />
        </div>
        <div className="col2">
          <h4>Equipo</h4>
        </div>
        <div className="col3">
          <h4>FAQs</h4>
        </div>
        <div className="col4">
          <h4>Contacto</h4>
        </div>
      </div>
      <hr />
      <div className="row2">
        <p className="col-sm">
          &copy;{new Date().getFullYear()} SPACE RIDERS | All rights reserved |
          Terms Of Service | Privacy
        </p>
      </div>
    </div>
  );
}

export default Footer;
