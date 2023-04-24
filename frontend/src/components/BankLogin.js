import React,{useRef, useState} from "react";
import Axios from "../utils/AxiosConfig";
import Loading from "./Loading";



const BankLogin = ()=>{

    const name = useRef("");
    const password = useRef("");
    const email = useRef("");

    const loginName = useRef("");
    const loginPass = useRef("");
    const [loading, setLoading] = useState(false);

    //Handlers

    const handleErr = (msg)=>{
        alert(msg);
        setLoading(() => false);
    }

    const handleSuccess = (data)=>{
        window.localStorage.setItem("banktoken", data.token);
        alert("Login Successful")

        window.location.reload();
    }

    const handleClick = (isLogin) =>{
        setLoading(true);
        const url = isLogin ? "/api/banklogin" : "/api/register";

        const data = isLogin ? {name: loginName.current.value, password: loginPass.current.value} : {name: name.current.value, password: password.current.value, email: email.current.value};
        
        Axios.post(url, data)
        .then(r => (r.status === 200) ? handleSuccess(r.data) : null)
        .catch(e => (e) ? handleErr("Try again with valid information") : null)
    }


    const LoginContainer = ()=>{
        return(
            <div className="login-signup-container">
                <div className="login-container">
                <h1>Bank Login</h1>

                <input ref={loginName} className="login-input" type="text" placeholder="Username"></input>
                <input ref={loginPass} className="login-input" type="password" placeholder="Password"></input>

                <button onClick={() => handleClick(true)} className="btn-login">Login</button>

                <p>Login as a Bank</p>
                </div>

                <div className="login-container">
                <h1>Bank SignUp</h1>

                <input ref={name} className="login-input" type="text" placeholder="Username"></input>
                <input ref={email} className="login-input" type="text" placeholder="Email"></input>
                <input ref={password} className="login-input" type="password" placeholder="Password"></input>

                <button onClick={() => handleClick(false)}  className="btn-login">Sign Up</button>

                <p>Register as a Bank</p>
            </div>
            </div>
        )
    }

    return(
        <section className="section-userlogin">
            {loading ? <Loading /> : <LoginContainer />} 
        </section>
    )
}

export default BankLogin;