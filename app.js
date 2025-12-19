const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");

const MONGO_URL='mongodb://127.0.0.1:27017/homeigo';

main().then(()=>{
    console.log("connected to DB");
}).catch(err =>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));


//index route
app.get("/listings",async(req,res)=>{
    const allListings=await Listing.find();
    res.render("./listings/index.ejs",{allListings});
});

// app.get("/testlisting",async(req,res)=>{
// let sampleTesting=new Listing({
//     title:"My new Villa",
//     description:"blbllblb",
//     price:12000,
//     location:"lahore",
//     country:"haha"
// });
// await sampleTesting.save();
// console.log("sample saved");
// res.send("sucess!!");
// })

app.get("/",(req,res)=>{
    res.send("ROOT HERE!");
});

app.listen(4040,()=>{
    console.log("sever is fine..");
});