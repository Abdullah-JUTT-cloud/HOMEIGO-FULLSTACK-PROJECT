const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isLoggedIn, isAuthor } = require("../middleware.js");
const { createReview, deleteReview } = require("../controllers/review.js");


// Create Review (POST)
router.post("/", isLoggedIn, validateReview, wrapAsync(createReview));

// Delete Review (DELETE)
router.delete("/:reviewId", isLoggedIn, isAuthor, wrapAsync(deleteReview));

module.exports = router;

