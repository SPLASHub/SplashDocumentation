import React from "react";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <img className="logo" src={process.env.PUBLIC_URL + '/Images/logo.png'} alt="SALVA" />
            <div className="links">
                <p onClick={() => window.scrollTo(0, 0)}>HOME</p>
                <p onClick={() => window.scrollTo(0, 900)}>ABOUT</p>
            </div>
        </nav>
    );
}

export default Navbar;