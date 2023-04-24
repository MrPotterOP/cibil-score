import user from "../models/user.js";
import jwt from "jsonwebtoken";



const checkBank = (req, res, next)=>{
    const rawToken = req.headers.authorization;
    // Handlers
    const checkUser = (id) =>{
        user.findOne({_id: id})
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

        const token = rawToken.split(" ");
        
        if(token[0] === "dummy"){
            req.user = {name: token[1], dummy: true}
            next();
        }else{
            jwt.verify(token[1], process.env.JWT_SECRET, (err, doc)=>{
                if(err){
                    return res.status(401).json({msg: "Unuthorized Access."});
                }else if(!doc){
                    return res.status(401).json({msg: "Unuthorized Access."});
                }else{
                    checkUser(doc.id);
                }
            })

        }

        

    }
}


export default checkBank;