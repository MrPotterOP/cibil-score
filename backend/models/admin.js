import mongoose from "mongoose";


const adminSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

const admin = new mongoose.model("admin", adminSchema);

export default admin;