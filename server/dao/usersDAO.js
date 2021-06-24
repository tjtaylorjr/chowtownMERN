const mongodb = require('mongodb');
const bcrypt = require('bcryptjs');

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

  static async addUser(firstName, lastName, username, hashedPassword, email) {
    try {
      const userProfile = {
        email: email,
        password: hashedPassword,
        username: username,
        firstName: firstName,
        lastName: lastName
      };

      return await users.insertOne(userProfile)
    } catch (err) {
      console.error(`Unable to create user: ${err}`);
      return { error: err };
    };
  };
};

module.exports = UsersDAO;
