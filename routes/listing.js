const express=require("express");
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");



//index route
router.get("/", wrapAsync(async (req, res) => {
  const allListings = await Listing.find();
  res.render("./listings/index.ejs", { allListings });
}));


//new route
router.get("/new",isLoggedIn, (req, res) => {
  res.render("./listings/new.ejs");
});


//show rounte
router.get("/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id).populate("reviews").populate("owner");
  if(!listing){
    req.flash("error"," !!!!----listing you trying to request doesnot exists-----!!!!");
    return res.redirect("/listings");
  }
  res.render("./listings/show.ejs", { listing });
}));


//create route
router.post("/",validateListing,wrapAsync( async (req, res, next) => {
    
    const newListing = new Listing(req.body.listing);
   newListing.owner=req.user._id;
    await newListing
      .save();
      req.flash("success","New listing created");
    res.redirect("/listings");
  
})  );


//edit route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if(!listing){
    req.flash("error"," !!!!----listing you trying to request doesnot exists-----!!!!");
    return res.redirect("/listings");
  }
  res.render("./listings/edit.ejs", { listing });
}));


//updaate route
router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync( async (req, res) => {
  
  let { id } = req.params;
  
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  req.flash("success"," listing updated");
  res.redirect(`/listings/${id}`);
}));


//delete route
router.delete("/:id",isLoggedIn,isOwner,wrapAsync( async (req, res) => {
  let { id } = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success"," listing deleted");
  res.redirect("/listings");
}));

module.exports=router;