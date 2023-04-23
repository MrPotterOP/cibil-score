import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    aadharNo: {type: Number, required: true, unique: true},
    email: String,
    password: {type: String, required: true}
});

const user = new mongoose.model("user", userSchema);

export default user;