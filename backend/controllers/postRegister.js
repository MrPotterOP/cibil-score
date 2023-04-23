import bank from "../models/bank.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();


const postRegister = (req, res)=>{
    const {name, email, password} = req.body;
    


    //Functional Components

    const genToken = (doc)=>{
        jwt.sign({name: doc.name, id: doc._id}, process.env.JWT_SECRET, {expiresIn: "3d"}, (err, token)=>{
            if(err){
                return res.status(401).json({msg: "Unable to Generate Token."});
            }else if(!token){
                return res.status(401).json({msg: "Unable to Generate Token."});
            }else {
                res.json({token: `Bearer ${token}`});
            }
        });
    }

    const hashPassword = ()=>{
        bcrypt.hash(password, 4, (e, hash)=>{
            if(e){
                return res.status(501).json({msg: "Something Went Wrong."});
            }else if(!hash){
                return res.status(501).json({msg: "Something Went Wrong."});
            }else {
                bank.create({name, email, password: hash})
                .then(docc =>{
                    if(docc){
                        genToken(docc);
                    }else{
                        return res.status(401).json({msg: "Invalid Input Provided."});
                    }
                    
                })
                .catch(er =>{
                
                    if(er){
                        return res.status(401).json({msg: "Invalid Input Provided."});
                    }
                })
            }
        })
    }



    // Main JS

    if(!name || !email || !password){
        return res.status(401).json({msg: "Fill All The Fields Properly."});
    }else{

        bank.findOne({name})
        .then(doc =>{
            if(doc){
                return res.status(401).json({msg: "Bank Already Registered."});
            }else{
                hashPassword();
            }
        })
        .catch(err =>{
            if(err){
                return res.status(501).json({msg: "Something Went Wrong."});
            }
        })

    }
}


export default postRegister;