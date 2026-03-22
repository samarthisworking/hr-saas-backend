import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("DB Connected"));

const Employee = mongoose.model("Employee", {
  name:String
});

app.get("/", (req,res)=>{
  res.send("API Running");
});

app.post("/add", async(req,res)=>{
  await Employee.create({name:req.body.name});
  res.send("Added");
});

app.get("/all", async(req,res)=>{
  const data = await Employee.find();
  res.json(data);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
  console.log("Server running");
});
