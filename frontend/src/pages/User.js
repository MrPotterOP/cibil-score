import React from "react";
import GetUserScore from "../components/GetUserScore";
import Navbar from "../components/Navbar";
import UserLogin from "../components/UserLogin";

const User = ()=>{

    const token = window.localStorage.getItem("usertoken");

    return (
        <section className="section-user">
            <Navbar />
            {token ? <GetUserScore /> : <UserLogin />}
        </section>
    )
}

export default User;