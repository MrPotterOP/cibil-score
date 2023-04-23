import bank from "../models/bank.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";




const PostBankLogin = (req, res) =>{
    const {name, password} = req.body;

    //Functional Components
    const genToken = (id, name)=>{
        jwt.sign({name, id: id}, process.env.JWT_SECRET, {expiresIn: "3d"}, (err, token)=>{
            if(err){
                return res.status(401).json({msg: "Unable to Generate Token."});
            }else if(!token){
                return res.status(401).json({msg: "Unable to Generate Token."});
            }else {
                res.json({token: `Bearer ${token}`});
            }
        });
    }


    const verifyBank = (hash, id, name, email)=>{
        bcrypt.compare(password.toString(), hash, (err, succ)=>{
            if(err){
                return res.status(401).json({msg: "Incorrect password"});
            }else if(!succ){
                return res.status(401).json({msg: "Incorrect password"});
            }else{
                genToken(id, name, email);
            }
        });
    }

    const checkBank = ()=>{
        bank.findOne({name})
        .then(doc =>{
            if(doc){
                verifyBank(doc.password, doc._id, doc.name);
            }else{
                return res.status(401).json({msg: "Bank not registered. try to register"})
            }
        })
        .catch(err =>{
            if(err){
                return res.status(501).json({msg: "Something Broke", err})
            }
        })
    }

    //Main JS
    if(!name || !password){
        return res.status(401).json({msg: "Input valid data"});
    }else{
        checkBank();
    }
}


export default PostBankLogin;