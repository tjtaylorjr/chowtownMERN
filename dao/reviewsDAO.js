const mongodb = require('mongodb');

const ObjectId = mongodb.ObjectID;

let reviews;

class ReviewsDAO {
  static async injectDB(conn) {
    if (reviews) {
      return;
    };

    try {
      reviews = await conn.db(process.env.REVIEWS_NS).collection("reviews");
    } catch (err) {
      console.error(`Unable to establish collection handles in userDAO: ${err}`);
    };
  };

  static async addReview(restaurantId, name, user_id, title, text, imageName, imageUrl, date) {
    try {
      // const reviewDoc = {
      //   name: name,
      //   user_id: user_id,
      //   date: date,
      //   title: title,
      //   text: text,
      //   imageName: imageName,
      //   imageUrl: imageUrl,
      //   restaurant_id: ObjectId(restaurantId)
      // };
      const reviewDoc = {
        name,
        user_id,
        date,
        title,
        text,
        imageName,
        imageUrl,
        restaurant_id: ObjectId(restaurantId)
      };

      return await reviews.insertOne(reviewDoc);
    } catch (err) {
      console.error(`Unable to post review: ${err}`);
      return { error: err };
    };
  };

  static async updateReview(reviewId, userId, text, image, url, date) {
    try {
      const updateResponse = await reviews.updateOne(
        {
          user_id: userId,
          _id: ObjectId(reviewId),
        },
        {
          $set:
            {
              text: text,
              image: image,
              url: url,
              date: date,
            },
        },
      );

      return updateResponse;
    } catch (err) {
      console.error(`Unable to update review: ${err}`);
      return { error: err };
    };
  };

  static async deleteReview(reviewId, userId) {
    try {
      const deleteResponse = await reviews.deleteOne(
        {
          _id: ObjectId(reviewId),
          user_id: userId,
        }
      );

      return deleteResponse;
    } catch (err) {
      console.error(`Unable to delete review: ${err}`);
      return { error: err };
    };
  };
};

module.exports = ReviewsDAO;
