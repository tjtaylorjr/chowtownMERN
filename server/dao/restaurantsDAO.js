const mongodb = require('mongodb');
const yelp = require('yelp-fusion');
const client = yelp.client(process.env.API_KEY);

const ObjectId = mongodb.ObjectID;

let restaurants;

class RestaurantsDAO {
  static async injectDB(conn) {
    if (restaurants) {
      return
    }
    try {
      restaurants = await conn.db(process.env.REVIEWS_NS).collection("restaurants");
    } catch (err) {
      console.error(`Unable to establish a collection handle in restaurantsDAO: ${err}`);
    };
  };

  static async postRestaurant(api_id, address, phone, cuisine, rating, name){
    try {
      const restaurantProfile = {
        name,
        address,
        phone,
        rating,
        cuisine,
        api_id
      };

      return await restaurants.insertOne(restaurantProfile);
    } catch (err) {
      console.error(`Unable to post restaurant profile: ${err}`);
      return { error: err };
    }
  };

  static async getRestaurants({
    filters = null,
    page = 0,
    restaurantsPerPage = 20
  } = {}) {
    let query;
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } };
      } else if ("cuisine" in filters) {
        query = { "cuisine": { $eq: filters["cuisine"] } };
      } else if ("zipcode" in filters) {
        query = { "address.zipcode": { $eq: filters["zipcode"] } };
    };

    let cursor

    try {
      cursor = await restaurants
        .find(query)
    } catch (err) {
      console.error(`Unable to issue find command, ${err}`);
      return { restaurantsList: [], totalNumRestaurants: 0 };
    }

    const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page);

    try {
      const restaurantsList = await displayCursor.toArray();
      const totalNumRestaurants = await restaurants.countDocuments(query);

      return { restaurantsList, totalNumRestaurants }
    } catch (err) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${err}`
      );
      return { restaurantsList: [], totalNumRestaurants: 0 };
    };
  } };

  static async getRestaurantByID(id) {
    try {
      const pipeline =
        [
          {
            $match:
              {
                _id: new ObjectId(id),
              },
          },
          {
            $lookup:
              {
                from: "reviews",
                let:
                  {
                    id: "$_id",
                  },
                pipeline:
                  [
                    {
                      $match:
                        {
                          $expr:
                            {
                              $eq:
                                [
                                  "$restaurant_id",
                                  "$$id"
                                ],
                            },
                        },
                    },
                    {
                      $sort:
                        {
                          date: -1,
                        },
                    },
                  ],
                  as: "reviews",
              },
          },
          {
            $addFields:
              {
                reviews: "$reviews",
              },
          },
        ];

      return await restaurants.aggregate(pipeline).next();
    } catch (err) {
      console.error(`Something went wrong in getRestaurantByID: ${err}`);
      throw err;
    };
  };

  static async getRestaurantID(api_id) {
    try {
      const pipeline =
        [
          {
            $match:
            {
              api_id,
            },
          }
        ];

      return await restaurants.aggregate(pipeline).next();
    } catch (err) {
      console.error(`Something went wrong in getRestaurantByApiID: ${err}`);
      throw err;
    };
  };

  static async getCuisines() {
    let cuisines = [];

    try {
      cuisines = await restaurants.distinct("cuisine");
      return cuisines;
    } catch (err) {
      console.error(`Unable to get cuisines, ${err}`);
      return cuisines;
    };
  };
};

module.exports = RestaurantsDAO;
