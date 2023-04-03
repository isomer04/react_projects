import React from "react";
// import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p>&copy; 2023 Weather Website. All rights reserved.</p>
          </div>
          <div className="col-md-6">
            <ul className="list-inline">
              <li className="list-inline-item">
                <a href="#">Terms of Use</a>
              </li>
              <li className="list-inline-item">
                <a href="#">Privacy Policy</a>
              </li>
              <li className="list-inline-item">
                <a href="#">Cookie Policy</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
