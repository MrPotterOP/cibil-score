import ticket from "../models/ticket.js";


const getUserScore = (req, res) =>{
    const {name, dummy} = req.user;

    let score = 1000;

    //Functional Components
    const Score = async (docs)=>{

        let tickets = [];
        console.log(docs);
        await docs.forEach(i =>{
        
            let iss = (i.issue === 0) ? "Unpayed Loan" : "Check Bounce";
            let amm = (i.ammount > 999) ? Math.floor(i.ammount / 10000) * 1 : 0;
            if(i.issue === 0){
                score = score - 300;
            }else if(i.issue === 1){
                score = score -400;
            }

            score = score - amm;

            tickets.push({id: i._id, issuer: i.issuer ,issue: iss, ammount: i.ammount});
        });
        console.log(tickets);
        return res.json({name, tickets, score});
    }


    const genScore = ()=>{
        ticket.find({userName: name})
        .then(docs =>{
            if(docs.length > 0){
                Score(docs);
            }else{
                return res.json({name, score, tickets: []});
            }
        })  
        .catch(err =>{
            if(err){
                return res.status(501).json({msg: "Something went wrong"});
            }
        })
    }

    //Main JS
    if(!name){
        return res.status(401).json({msg: "Invalid Info"});
    }else{
        if(dummy){
            return res.json({name, score, tickets: []});
        }else{
            genScore();
        }
    }
}


export default getUserScore;