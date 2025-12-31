const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const { index, newListing, showListing, createListing, editListing, updateListing, deleteListing } = require("../controllers/listing.js");
const multer  = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// Index & Create Routes
router
    .route("/")
    .get(wrapAsync(index))
    .post(validateListing, isLoggedIn,upload.single('listing[image][url]'), wrapAsync(createListing));


// New Route
router.get("/new", isLoggedIn, newListing);

// Show, Update & Delete Routes
router
    .route("/:id")
    .get(wrapAsync(showListing))
    .put(isLoggedIn,upload.single('listing[image][url]'), isOwner, validateListing, wrapAsync(updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(deleteListing));

// Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(editListing));

module.exports = router;