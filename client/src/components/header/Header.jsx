import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logoutUser, reset } from "../../features/auth/AuthSlice";

const Header = ({ children }) => {
  const { totalQuantity } = useSelector((state) => state.productCart);
  const { user, message } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const logOutHandler = () => {
    dispatch(logoutUser());
    navigate("/");
    toast.success("You logged out!", {
      position: toast.POSITION.TOP_CENTER,
    });

    dispatch(reset());
  };

  return (
    <>
      <div className="container mb-5">
        <nav
          className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top mb-5"
          style={{ backgroundColor: "#0000" }}
        >
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              E-store
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {/* <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/products"
                >
                  Products
                </Link>
              </li> */}
              </ul>

              <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/products"
                  >
                    Products
                  </Link>
                </li>
                {!user ? (
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                ) : (
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      to="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {user.username}
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <Link className="dropdown-item" to={"/profile"}>
                          profile
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" onClick={logOutHandler}>
                          logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                )}
                {user?.is_admin === true ? (
                  <Link className="nav-link" to="/dashboard">
                    Dashboard
                  </Link>
                ) : (
                  ""
                )}

                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    Cart <ShoppingCartOutlinedIcon />{" "}
                    <sup className="text-white fw-bold">{totalQuantity}</sup>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    About Us
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/contact">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      {children}
    </>
  );
};

export default Header;
