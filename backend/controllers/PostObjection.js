import ticket from "../models/ticket.js";
import objection from "../models/objection.js";

const PostObjection = (req, res)=>{
    const {ticketId, description} = req.body;
    const {name} = req.user;

    //Functional Components
    const addObjection = ()=>{
        objection.create({userName: name, description, ticketId})
        .then(doc =>{
            if(doc){
                return res.json({msg: "Objection Added."})
            }else{
                return res.status(401).json({msg: "Invalid Information"})
            }
        })
        .catch(err =>{
            if(err){
                return res.status(501).json({msg: "Something Broke", err})
            }
        })
    }

    const checkTicket = ()=>{
        ticket.findOne({_id: ticketId})
        .then(doc =>{
            if(doc){
                if(doc.userName === name){
                    addObjection();
                }
            }else{
                return res.status(401).json({msg: "Invalid Ticket ID"})
            }
        })
        .catch(err =>{
            if(err){
                return res.status(501).json({msg: "Something Broke", err})
            }
        })
    }

    // Main JS
    if(!name || !ticketId || !description){
        return res.status(401).json({msg: "Provide valid data"})
    }else{
        checkTicket();
    }

}


export default PostObjection;