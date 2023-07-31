import React from "react";
import { Link } from "react-router-dom";
import "../../../css/navbar.css";

const index = () => {
  return (
    <>
      {/* <div className="leftNavbar">
         <ul>
             <li><Link to='/dashboard'>Dashboard</Link></li>
             <li><Link to='/user'>Users</Link></li>
         </ul>
         
         </div> */}
      <nav className="left-navigation">
        <div className="logo">Logo</div>
        <ul className="left-navigation-menu">
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/users">User Manager</Link>
          </li>
          <li>
            <Link to="/products">Product Manager</Link>
          </li>
          <li>
            <Link to="/transtractions">Order Manager</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};
export default index;
