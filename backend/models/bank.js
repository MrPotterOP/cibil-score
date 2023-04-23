import mongoose from "mongoose";


const bankSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
});

const bank = new mongoose.model("bank", bankSchema);

export default bank;