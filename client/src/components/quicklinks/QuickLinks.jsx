import React from "react";
import { Link } from "react-router-dom";
import './quicklinks.css'

const QuickLinks = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-row">
          <div className="footer-col">
            <h4>E-store</h4>

            <ul>
              <li>
                <Link to={"/about"}>about us</Link>
              </li>
              <li>
                <Link to={"/about"}>our services</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>get help</h4>

            <ul>
              <li>
                <Link to={"/about"}>FAQ</Link>
              </li>
              <li>
                <Link to={"/about"}>Shipping</Link>
              </li>
              <li>
                <Link to={"/about"}>returns</Link>
              </li>
              <li>
                <Link to={"/about"}>order status</Link>
              </li>
              <li>
                <Link to={"/about"}>payment options</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>online shop</h4>

            <ul>
              <li>
                <Link to={"/about"}>electronics</Link>
              </li>
              <li>
                <Link to={"/about"}>phones</Link>
              </li>
              <li>
                <Link to={"/about"}>watches</Link>
              </li>
              <li>
                <Link to={"/about"}>dress</Link>
              </li>
              <li>
                <Link to={"/about"}>shoes</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>follow us</h4>
            <div className="social-links">
              <Link to={"/"}>facebook</Link>
              <Link to={"/"}>twitter</Link>
              <Link to={"/"}>instagram</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default QuickLinks;
