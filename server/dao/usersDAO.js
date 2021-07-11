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

  static async getUserByEmail(email) {
    try {
      const user = await users.findOne({email});
      const secret = process.env.JWT_SECRET;
      //return await users.findOne({email});
      return {user, secret}

    } catch (err) {
      console.error(`Unable to find user: ${err}`);
      return {error: err };
    };
  };

  static async addUser(firstname, lastname, username, hashedPassword, email) {
    try {
      const userProfile = {
        email: email,
        password: hashedPassword,
        username: username,
        firstname: firstname,
        lastname: lastname
      };

      return await users.insertOne(userProfile)
    } catch (err) {
      console.error(`Unable to create user: ${err}`);
      return { error: err };
    };
  };
};

module.exports = UsersDAO;
