import user from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



const postUserLogin = (req, res)=>{
    const {name, password} = req.body;

    //Functional Components
    

    const genToken = (id, userName) =>{
        jwt.sign({name: userName, id: id}, process.env.JWT_SECRET, {expiresIn: "3d"}, (err, token)=>{
            if(err){
                return res.status(401).json({msg: "Unable to Generate Token."});
            }else if(!token){
                return res.status(401).json({msg: "Unable to Generate Token."});
            }else {
                res.json({token: `Bearer ${token}`});
            }
        });
    }

    const verifyUser = (hash, id, userName) =>{
        bcrypt.compare(password.toString(), hash, (err, succ)=>{
            if(err){
                return res.status(401).json({msg: "Incorrect password"});
            }else if(!succ){
                return res.status(401).json({msg: "Incorrect password"});
            }else{
                genToken(id, userName);
            }
        });
    }


    const checkUser = ()=>{
        user.findOne({name})
        .then(doc =>{
            if(doc){
                verifyUser(doc.password, doc._id, doc.name);
            }else{
                return res.json({token: "dummy " + name, dummyToken: true});
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
        return res.status(401).json({msg: "provide valid information"});
    }else{
        checkUser();
    }
}


export default postUserLogin;