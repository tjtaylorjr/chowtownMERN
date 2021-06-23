const mongodb = require('mongodb');

const ObjectId = mongodb.ObjectID;

let users;

class UsersDAO {
  static async injectDB(conn) {
    if (users) {
      return;
    };

    try {
      users = await conn.db(process.env.REVIEWS_NS).collection("users");
    } catch (err) {
      console.error(`Unable to establish a collection handle in authDAO: ${err}`);
    };
  };
};

module.exports = UsersDAO;
