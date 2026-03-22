import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// DB connect
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("DB Connected"))
.catch(err=>console.log(err));

// Model
const Employee = mongoose.model("Employee", {
  name:String
});

// Test route
app.get("/", (req,res)=>{
  res.send("API Running");
});

// Add employee
app.post("/add", async(req,res)=>{
  try{
    await Employee.create({name:req.body.name});
    res.send("Added");
  }catch(e){
    res.status(500).send(e.message);
  }
});

// Get all employees
app.get("/all", async(req,res)=>{
  try{
    const data = await Employee.find();
    res.json(data);
  }catch(e){
    res.status(500).send(e.message);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
  console.log("Server running on " + PORT);
});
