import express from "express";


const Router = express.Router();
import postRegister from "../controllers/postRegister.js";
import postTicket from "../controllers/postTicket.js";
import checkBank from "../middlewares/checkBank.js";
import checkUser from "../middlewares/checkUser.js"
import postBankLogin from "../controllers/PostBankLogin.js";
import postUserLogin from "../controllers/PostUserLogin.js";
import postObjection from "../controllers/PostObjection.js";


Router.get("/test", (req, res)=>{
    res.json({msg: "Server is live"})
});

Router.post("/banklogin", postBankLogin);
Router.post("/register", postRegister);
Router.post("/ticket", checkBank , postTicket);
Router.post("/userlogin", postUserLogin);
Router.post("/objection", checkUser, postObjection);



export default Router;