import objection from "../models/objection.js";
import ticket from "../models/ticket.js";




const postRemoveObjection = (req, res)=>{
    const {ticketId, objectionId} = req.body;
    const {name} = req.user;

    //Functional Components
    const findTicket = ()=>{
        ticket.findOneAndDelete({_id: ticketId})
        .then(i =>{
            objection.findOneAndDelete({_id: objectionId})
            .then(doc =>{
                return res.json({msg: "Objection Approved"});
            })
        })
        .catch(e =>{
            if(e){
                return res.status(501).json({msg: "Something went wrong"});
            }
        })
    }

    //MainJS
    if(!ticketId || !name || !objectionId){
        return res.status(401).json({msg: "Invalid Info Provided"});
    }else{
        findTicket();
    }
}

export default postRemoveObjection;