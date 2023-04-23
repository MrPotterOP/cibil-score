import admin from "../models/admin.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";




const PostAdminLogin = (req, res) =>{
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


    const verifyAdmin = (hash, id, name)=>{
        bcrypt.compare(password.toString(), hash, (err, succ)=>{
            if(err){
                return res.status(401).json({msg: "Incorrect password"});
            }else if(!succ){
                return res.status(401).json({msg: "Incorrect password"});
            }else{
                genToken(id, name);
            }
        });
    }

    const checkAdmin = ()=>{
        admin.findOne({name})
        .then(doc =>{
            if(doc){
                verifyAdmin(doc.password, doc._id, doc.name);
            }else{
                return res.status(401).json({msg: "Invalid Admin Name"})
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
        checkAdmin();
    }
}


export default PostAdminLogin;