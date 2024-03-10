const express = require('express');
const reviewController = require("../controllers/reviewControllers");
const reviewRouter = express.Router();

reviewRouter.get("/", reviewController.getReview);

reviewRouter.get("/:id", reviewController.getReviewByID);

reviewRouter.use(reviewController.verifyToken);

reviewRouter.post("/", reviewController.createReview);

reviewRouter.put("/:id", reviewController.updateReview);

reviewRouter.delete("/:id", reviewController.deleteReview);

module.exports = reviewRouter