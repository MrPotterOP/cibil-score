import objection from "../models/objection.js";


const GetObjections = (req, res) =>{
    objection.find({})
    .then(doc =>{
        return res.json({docs: doc});
    })  
    .catch(e =>{
        if(e){
            return res.status(501).json({msg: "Something went wrong"})
        }
    })
}

export default GetObjections;