import React from "react";
import {Routes, Route, BrowserRouter} from "react-router-dom";

import Navbar from "./components/Navbar";
import User from "./pages/User";
import Bank from "./pages/Bank";
import Admin from "./pages/Admin";


const App = ()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navbar />} exact/>
                <Route path="/user" element={<User />} exact/>
                <Route path="/bank" element={<Bank />} exact/>
                <Route path="/admin" element={<Admin />} exact/>
            </Routes>
        </BrowserRouter>
    )
}


export default App;