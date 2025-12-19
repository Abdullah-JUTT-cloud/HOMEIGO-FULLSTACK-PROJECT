const express=require("express");
const app=express();
const mongoose=require("mongoose");

const MONGO_URL='mongodb://127.0.0.1:27017/homeigo';

main().then(()=>{
    console.log("connected to DB");
}).catch(err =>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.get("/",(req,res)=>{
    res.send("ROOT HERE!");
});

app.listen(4040,()=>{
    console.log("sever is fine..");
});