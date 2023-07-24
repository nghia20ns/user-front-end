import React from "react";
import "../../../css/header.css";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate =useNavigate()
  const btnLogout=()=>{
    localStorage.removeItem('token');
    navigate("/")
  }
  return (
    <>
      <header className="header">
        <div className="header-logo">Logo</div>
        <div className="header-menu">
          <ul className="header-menu-list">
            <li>
              <div className="header-right">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                  alt="Avatar"
                  className="header-avatar"
                />
              </div>
            </li>
            <li>
              <div className="header-right">
              <button type="button" className="btn btn-link" onClick={btnLogout}>Logout</button>
              </div>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Index;
