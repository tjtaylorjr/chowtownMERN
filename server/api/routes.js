const express = require('express');
const RestaurantsCtrl = require('./restaurants.controller.js');
const ReviewsCtrl = require('./reviews.controller.js');
const UsersCtrl = require('./users.controller.js');

const router = express.Router();

router.route("/users/login").post(UsersCtrl.apiPostLogin);
router.route("/users/signup").post(UsersCtrl.apiPostSignup);
router.route("/users/restore").post(UsersCtrl.apiPostRestore);
router.route("/users").post(UsersCtrl.apiPostGoogleLogin);

router.route("/restaurants").get(RestaurantsCtrl.apiGetRestaurants);
router.route("/restaurants/id/:id").get(RestaurantsCtrl.apiGetRestaurantById);
router.route("/restaurants/cuisines").get(RestaurantsCtrl.apiGetRestaurantCuisines);

router
  .route("/restaurants/review")
  .post(ReviewsCtrl.apiPostReview)
  .put(ReviewsCtrl.apiUpdateReview)
  .delete(ReviewsCtrl.apiDeleteReview)

module.exports = router;
