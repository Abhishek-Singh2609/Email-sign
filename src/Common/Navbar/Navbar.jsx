import React from "react";
import "./Navbar.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const navigate = useNavigate();

  // Check if user is logged in by checking for a token in localStorage
  const isLoggedIn = localStorage.getItem("accessToken") !== null;

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        // "https://agile-email-signature-dydmacbfh4e6cmf0.canadacentral-01.azurewebsites.net/auth/logout",
        "https://email-signature-ewasbjbvendvfwck.canadacentral-01.azurewebsites.net/auth/logout",

        {
          method: "GET",
        }
      );

      if (response.ok) {
        // Clear local storage
        localStorage.clear();
        console.log(response.ok);

        // Show success toast
        toast.success("Logged out successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Redirect to home page after a short delay
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      toast.error("Logout failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed sticky-top navbars_fix mt-2">
      <div className="container-fluid nav-bgcolor">
        <Link to="/" className="navbar-brand logo-text">
          AGILE SIGNATURE
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle navlink-text"
                href="#"
                id="navbarDropdownMenuLinkWhy"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Why Agile
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLinkWhy"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle navlink-text"
                href="#"
                id="navbarDropdownMenuLinkSolutions"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Solutions
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLinkSolutions"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link navlink-text" href="#">
                Enterprise
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle navlink-text"
                href="#"
                id="navbarDropdownMenuLinkResources"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Resources
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLinkResources"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <ul className="navbar-nav">
            {/* Conditionally render Login or Logout */}
            {isLoggedIn ? (
              <li className="nav-item">
                <Link
                  to="/"
                  onClick={handleLogout}
                  className="nav-link navlink-text"
                >
                  Logout
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link to="/login" className="nav-link navlink-text">
                  Login
                </Link>
              </li>
            )}
            <div className="button-group">
              <li className="nav-item">
                <Link to="/demo" className="btn btn-demo">
                  DEMO
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/trial" className=" btn btn-trial">
                  TRIAL
                </Link>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
