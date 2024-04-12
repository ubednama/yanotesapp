import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const NavBar = () => {
  const { authUser,setAuthUser} = useAuthContext();
  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.removeItem("jwtToken")
    setAuthUser(null)
    console.log("from logout", setAuthUser)
  }

  const updatePath = () => {
  location.pathname==="/login" ? navigate("/signup") : navigate("/login")
  }

  return (
    <>
      <nav className="navbar d-flex navbar-expand-lg bg-body-tertiary bg-dark align-items-center" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            YANotesApp
          </a>
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/" ? "active" : ''}`} aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/about" ? "active" : ''}`} to="/about">
                  About
                </Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success me-2" type="submit">
                Search
              </button>
              {authUser !== null && (
                <button className="btn me-2" onClick={logoutUser}>
              <span className="fa-solid fa-right-from-bracket"></span>
              </button>
              )}
              {authUser === null && (
                <button className="btn me-2 btn-primary" style={{width: "8rem"}} onClick={updatePath}>
                  {location.pathname==="/login" ? "Signup" : "Login"}
              </button>
              )}
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
