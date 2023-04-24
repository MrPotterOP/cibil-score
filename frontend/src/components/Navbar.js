import React from "react";
import { Link, useLocation } from "react-router-dom";



const Navbar = ()=>{
    const location = useLocation();

    


    return (
        <nav>
            <Link className="nav-logo" to="/">CIBIL</Link>
 
            <div className="nav-menu">
                <Link className={(location.pathname.includes("user")) ? "nav-menu-item active" : "nav-menu-item"} to="/user">Check Score</Link>
                <Link className={(location.pathname.includes("bank")) ? "nav-menu-item active" : "nav-menu-item"} to="/bank">Bank Dashboard</Link>
                <Link className={(location.pathname.includes("admin")) ? "nav-menu-item active" : "nav-menu-item"} to="/admin">Admin Panel</Link>
            </div>
        </nav>
    );
}


export default Navbar;