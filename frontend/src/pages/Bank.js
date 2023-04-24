import React from "react";
import Navbar from "../components/Navbar";
import BankDashboard from "../components/BankDashboard";
import BankLogin from "../components/BankLogin";


const Bank = ()=>{

    const token = window.localStorage.getItem("banktoken");

    return (
        <section className="section-bank">
            <Navbar />
            {token ? <BankDashboard /> : <BankLogin />}
        </section>
    )
}

export default Bank;