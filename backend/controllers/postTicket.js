import ticket from "../models/ticket.js";
import user from "../models/user.js";
import bcrypt from "bcryptjs";



const postTicket = (req, res) =>{

    const response = (st, msg, data) =>{
        return res.status(st).json({msg, data});
    }

    const {userName , issue, ammount, aadharNo} = req.body;
    const {name} = req.user;

    //Functional Components

    const createUser = async ()=>{
        bcrypt.hash(aadharNo.toString(), 4, (err, hash)=>{
            if(err){
                response(501, "Something went wrong");
            }else{
                user.create({name: userName, aadharNo, password: hash})
                .then(doc =>{
                    response(200, "Ticket created successfully.");
                })
            }
        })

    }

    const findUser = ()=>{
        user.findOne({name: userName})
        .then(doc =>{
            if(doc){
                response(200, "Ticket created successfully.");
            }else{
                createUser();
            }
        })
        .catch(err =>{
            if(err){
                response(501, "Something went wrong", err)
            }
        })
    }

    const addTicket = ()=>{
        let date = new Date();

        let now = new Date(date.toLocaleString('en-US', { timeZone: "Asia/Kolkata" }));

        ticket.create({userName, issuer: name, issue, ammount, issueDate: now})
        .then(doc =>{
            if(doc){
                findUser();
            }
        })
        .catch(err =>{
            if(err){
                response(501, "Something went wrong", err);
            }
        })
    }

    //Main Js
    if(!userName || !name || !aadharNo){
        response(401, "Provide valid input")
    }else if (typeof ammount === "undefined" || typeof issue === "undefined"){
        response(401, "Provide valid input")
    }
    else{
        addTicket();
    }


}


export default postTicket;