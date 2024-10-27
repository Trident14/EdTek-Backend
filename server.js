const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const UserDetails = require("./models/UserDetails")

const app = express();
require("dotenv").config();

mongoose.connect(process.env.DBkey);

const PORT= process.env.PORT || 3001;
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).json({ message: "Request was successful!" });
})

app.post("/userDetails",async(req,res)=>{
    try{
        const {name,email,mobile} = req.body;
        const existingUser = await UserDetails.findOne({name:name});
        if (existingUser) {
            return res.status(409).json({ message: "User already exists." }); 
        }
        const newUser = new UserDetails({name,email,mobile});
        await newUser.save();
        return res.status(201).json({ message: "User created successfully.", user: newUser }); 
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ message: "Internal server error." }); 
    }
})

app.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}`);
})