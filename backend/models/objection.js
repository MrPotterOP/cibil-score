import mongoose from "mongoose";


const objectionSchema = new mongoose.Schema({
    userName: {type: String, required: true},
    description: {type: String, required: true},
    ticketId: {type: String, required: true}
});

const objection = new mongoose.model("objection", objectionSchema);

export default objection;