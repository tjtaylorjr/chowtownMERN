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
    //console.log(email)
    try {
      const user = await users.findOne({email});
      //const secret = process.env.JWT_SECRET;
      //return await users.findOne({email});
      //console.log(user)
      return {user}

    } catch (err) {
      console.error(`Unable to find user: ${err}`);
      return {error: err };
    };
  };

  static async addUser(givenName, familyName, name, username, imageUrl, email, hashedPassword) {
    try {
      const userProfile = {
        givenName,
        familyName,
        name,
        username,
        imageUrl,
        email,
        password: hashedPassword
      };

      return await users.insertOne(userProfile)
    } catch (err) {
      console.error(`Unable to create user: ${err}`);
      return { error: err };
    };
  };
};

module.exports = UsersDAO;
