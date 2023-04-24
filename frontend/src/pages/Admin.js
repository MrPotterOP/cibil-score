import React from "react";
import AdminLogin from "../components/AdminLogin";
import AdminPanal from "../components/AdminPanel";
import Navbar from "../components/Navbar";


const Admin = ()=>{

    const token = window.localStorage.getItem("admintoken");

    return (
        <section className="section-admin">
            <Navbar />
            {token ? <AdminPanal /> : <AdminLogin />}
        </section>
    )
}

export default Admin;