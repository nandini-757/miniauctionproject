import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark shadow-lg fixed-top">
      <div className="container">
        {/* Brand Logo */}
        <Link className="navbar-brand text-light fw-bold fs-3" to="/">
          ⚡ Auction App
        </Link>

        {/* Navbar Links */}
        <div className="ms-auto d-flex gap-4">
          <Link className="nav-link text-light fs-5 nav-item-custom" to="/">Signup</Link>
          <Link className="nav-link text-light fs-5 nav-item-custom" to="/signin">Signin</Link>
          <Link className="nav-link text-light fs-5 nav-item-custom" to="/dashboard">Auction Dashboard</Link>
          <Link className="nav-link text-light fs-5 nav-item-custom" to="/post-auction">Post Auction</Link>
          <Link className="nav-link text-light fs-5 nav-item-custom" to="/close-auction">close Auction</Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
