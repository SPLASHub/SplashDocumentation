import React from "react";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <img className="logo" src={process.env.PUBLIC_URL + '/Images/logo.png'} alt="SALVA" />
            <div className="links">
                <a href="/">a</a>
            </div>
        </nav>
    );
}

export default Navbar;