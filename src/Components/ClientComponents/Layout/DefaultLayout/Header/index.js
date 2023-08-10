import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const btnLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      {" "}
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="navbar-brand" to={"/home"} aria-current="page">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="navbar-brand"
                  to={"/about"}
                  aria-current="page"
                >
                  about
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav  mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="navbar-brand"
                  to={"/information"}
                  aria-current="page"
                >
                  information
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="navbar-brand"
                  to={"/"}
                  onClick={btnLogout}
                  aria-current="page"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Index;
