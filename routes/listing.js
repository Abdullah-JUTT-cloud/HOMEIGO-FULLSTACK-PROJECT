const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const { index, newListing, showListing, createListing, editListing, updateListing, deleteListing } = require("../controllers/listing.js");


// Index & Create Routes
router
    .route("/")
    .get(wrapAsync(index))
    .post(validateListing, isLoggedIn, wrapAsync(createListing));

// New Route
router.get("/new", isLoggedIn, newListing);

// Show, Update & Delete Routes
router
    .route("/:id")
    .get(wrapAsync(showListing))
    .put(isLoggedIn, isOwner, validateListing, wrapAsync(updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(deleteListing));

// Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(editListing));

module.exports = router;