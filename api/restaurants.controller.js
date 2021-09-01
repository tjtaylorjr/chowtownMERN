const RestaurantsDAO = require('../dao/restaurantsDAO.js');
const api = require('yelp-fusion');
const dotenv = require('dotenv');
const { query } = require('express');
dotenv.config()
const apiKey = process.env.API_KEY;
const client = api.client(apiKey);



class RestaurantsController {

  static async apiGetYelpRestaurants(req, res, next) {
    const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage, 10) : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;
    let filters = {}
    if(req.query.q) {
      filters.query = req.query.q;
    }
    if(req.query.lat) {
      filters.latitude = req.query.lat;
    }
    if(req.query.lon) {
      filters.longitude = req.query.lon;
    }

    const searchRequest = {
      term: filters?.query,
      categories: "restaurants",
      latitude: filters?.latitude,
      longitude: filters?.longitude,
      limit: "50"
    }
    let restaurantsList;
    let totalNumRestaurants;

    client.search(
      searchRequest
    ).then((response) => {
      restaurantsList = response.jsonBody.businesses;
      totalNumRestaurants = restaurantsList.length;

      let result = {
        restaurants: restaurantsList,
        page: page,
        filters: filters,
        entries_per_page: restaurantsPerPage,
        total_results: totalNumRestaurants,
      };

      return res.json(result);

    }).catch((err) => {
      console.error(`Unable to find restaurants, ${err}`);
      return { restaurantsList: [], totalNumRestaurants: 0 };
    })

  };

  static async apiGetRestaurants(req, res, next) {
    const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage, 10) : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {}
    if (req.query.cuisine) {
      filters.cuisine = req.query.cuisine;
    } else if (req.query.zipcode) {
      filters.zipcode = req.query.zipcode;
    } else if (req.query.name) {
      filters.name = req.query.name;
    }

    const { restaurantsList, totalNumRestaurants } = await RestaurantsDAO.getRestaurants({
      filters,
      page,
      restaurantsPerPage,
    });

    let response = {
      restaurants: restaurantsList,
      page: page,
      filters: filters,
      entries_per_page: restaurantsPerPage,
      total_results: totalNumRestaurants,
    };

    res.json(response);
  };

  static async apiGetRestaurantById(req, res, next) {
    try {
      const id = req.params.id || {};
      const restaurant = await RestaurantsDAO.getRestaurantByID(id);

      if(!restaurant) {
        res.status(404).json({ error: "Not found" });
        return;
      }

      res.json(restaurant);
    } catch (err) {
      console.error(`api, ${err}`);
      res.status(500).json({ error: err });
    };
  };

  static async apiGetRestaurantId(req, res, next) {
    try {
      const api_id = req.params.api_id || {};
      const restaurant = await RestaurantsDAO.getRestaurantID(api_id);


      if(!restaurant) {
        res.status(404).json({error: "Not found"});
        return;
      }

      res.json(restaurant);
    } catch (err) {
    console.error(`api, ${err}`);
    res.status(500).json({ error: err });
    };
  };

  static async apiGetRestaurantCuisines(req, res, next) {
    try {
      const cuisines = await RestaurantsDAO.getCuisines();

      res.json(cuisines);
    } catch (err) {
      console.error(`api, ${err}`);
      res.status(500).json({ error: err });
    };
  };

  static async apiPostRestaurant(req, res, next) {
    try {
      const api_id = req.body.api_id;
      const address = req.body.address;
      const phone = req.body.phone;
      const name = req.body.name;
      const cuisine = req.body.cuisine;
      const rating = req.body.rating;

      const reviewResponse = await RestaurantsDAO.postRestaurant(
        api_id,
        address,
        phone,
        cuisine,
        rating,
        name
      );

      res.json({ status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    };
  };

};

module.exports = RestaurantsController;
