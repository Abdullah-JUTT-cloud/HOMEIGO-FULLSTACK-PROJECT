const express=require("express");
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const { index,newListing,showListing,createListing,editListing,updateListing,deleteListing } = require("../controllers/listing.js");


//index route
router.get("/", wrapAsync(index));


//new route
router.get("/new", newListing);


//show rounte
router.get("/:id", wrapAsync(showListing));


//create route
router.post("/",validateListing,isLoggedIn,wrapAsync( createListing)  );


//edit route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(editListing));


//updaate route
router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(updateListing));


//delete route
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(deleteListing ));

module.exports=router;