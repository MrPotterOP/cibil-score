import React,{useRef, useState} from "react";
import Axios from "../utils/AxiosConfig";
import Loading from "./Loading";




const UserLogin = ()=>{

    const name = useRef("");
    const password = useRef("");
    const [loading, setLoading] = useState(false);
    const url = "/api/userlogin";

    // handlers
    const handleErr = (msg)=>{
        alert(msg);
        setLoading(() => false);
    }

    const handleSuccess = (data)=>{
        window.localStorage.setItem("usertoken", data.token);
        alert("Login Successful")

        window.location.reload();
    }

    const handleClick = ()=>{
        setLoading(true);
        Axios.post(url, {name: name.current.value, password: password.current.value})
        .then(r => (r.status === 200) ? handleSuccess(r.data) : null)
        .catch(e => (e) ? handleErr("Something went wrong. Try again") : null)
    }


    const LoginContainer = ()=>{
        return(
            <div className="login-container">
                <h1>User Login</h1>

                <input ref={name} className="login-input" type="text" placeholder="Username"></input>
                <input ref={password} className="login-input" type="password" placeholder="Password / Aadhar No."></input>

                <button onClick={()=> handleClick()} className="btn-login">Login</button>

                <p>Login to check your CIBIL score</p>
            </div>
        )
    }


    return (
        <section className="section-userlogin">
            {loading ? <Loading /> : <LoginContainer />} 
        </section>
    )
}

export default UserLogin;