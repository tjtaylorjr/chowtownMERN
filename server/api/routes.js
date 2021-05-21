const express = require('express');
const RestaurantsCtrl = require('./restaurants.controller.js');
const ReviewsCtrl = require('./reviews.controller.js');
const AuthCtrl = require('./auth.controller.js');

const router = express.Router();

router.route("/auth/login").post(AuthCtrl.apiPostLogin);
router.route("/auth/signup").post(AuthCtrl.apiPostSignup);

router.route("/restaurants").get(RestaurantsCtrl.apiGetRestaurants);
router.route("/restaurants/id/:id").get(RestaurantsCtrl.apiGetRestaurantById);
router.route("/restaurants/cuisines").get(RestaurantsCtrl.apiGetRestaurantCuisines);

router
  .route("/restaurants/review")
  .post(ReviewsCtrl.apiPostReview)
  .put(ReviewsCtrl.apiUpdateReview)
  .delete(ReviewsCtrl.apiDeleteReview)

module.exports = router;
