import mongoose from "mongoose";


const ticketSchema = new mongoose.Schema({
    userName: {type: String, required: true},
    issuer: {type: String, required: true},
    issue: {type: Number, required: true},
    ammount: {type: Number, required: true},
    issueDate: {type: Number, required: true}
});

const ticket = new mongoose.model("ticket", ticketSchema);

export default ticket;