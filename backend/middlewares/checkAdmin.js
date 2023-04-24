import admin from "../models/admin.js";
import jwt from "jsonwebtoken";



const checkAdmin = (req, res, next) =>{
    const rawToken = req.headers.authorization;

    //Functional Components

    const checkAdmin = (id, name)=>{
        admin.findOne({name})
        .then(doc=>{
            if(doc){
                req.user = {id: doc._id, name: doc.name}
                next();
            }else{
                return res.status(401).json({msg: "Access Denied"})
            }
        })
        .catch(err =>{
            if(err){
                return res.status(501).json({msg: "Try again."})
            }
        })
    }

    //Main JS
    if(!rawToken){
        res.status(401).json({msg: "Access Denied."});
    }else{

        const token = rawToken.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, doc)=>{
            if(err){
                return res.status(401).json({msg: "Unuthorized Access."});
            }else if(!doc){
                return res.status(401).json({msg: "Unuthorized Access."});
            }else{
                checkAdmin(doc.id, doc.name);
            }
        })
        

    }
}

export default checkAdmin;