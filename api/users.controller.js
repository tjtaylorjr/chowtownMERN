const UsersDAO = require('../dao/usersDAO.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()
const secret = process.env.JWT_SECRET;
const OAuth_client = process.env.GOOGLE_OAUTH_CLIENT_ID;
const OAuth_secret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
const geo_api = process.env.GEO_API;



class UsersController {

  static async apiGetGeoApi(req, res, next) {
    return res.json(geo_api);
  };

  static async apiGetOAuthClient(req, res, next) {
    return res.json(OAuth_client);
  };

  static async apiGetOAuthSecret(req, res, next) {
    return res.json(OAuth_secret);
  };

  static async apiPostGoogleLogin(req, res, next) {
    const { email } = req.body;

    try {
      const userRecord = await UsersDAO.getUserByEmail(email);

      if (!userRecord.user) {
        return res.status(404).json({ message: "User does not exist" });
      }

      const { _id, username } = userRecord.user;

      res.status(200).json({ _id, username });
    } catch (err) {
      console.error(`api, ${err}`);
      res.status(500).json({ error: err });
    }
  }

  static async apiPostLogin(req, res, next) {

    const { email, password } = req.body;
    try {
      const userRecord = await UsersDAO.getUserByEmail(email);

      if(!userRecord.user) {
        return res.status(404).json({message: "User does not exist"});
      }

      const passwordMatch = await bcrypt.compare(password, userRecord.user.password);

      if(!passwordMatch) {
        return res.status(400).json({message: "Invalid credentials"});
      };

      const { _id, username, givenName, familyName, name, imageUrl } = userRecord.user

      const user = {
        _id,
        email,
        username,
        givenName,
        familyName,
        name,
        imageUrl
      }

      const token = jwt.sign(
        {
          email: email,
          id: _id
        },
        secret,
        { expiresIn: "1h" }
      );

      res.status(200).json({ result: user, token });

    } catch (err) {
      console.error(`api, ${err}`);
      res.status(500).json({error: err});
    }
  }

  static async apiPostRestore(req, res, next) {
    console.log(req.body)
    try {
      const jwtdata = req.body;
      const isGoogleToken = jwtdata.token.length > 500;

      if (isGoogleToken) {
        const decodedToken = jwt.decode(jwtdata.token);
        console.log(decodedToken)
        if (jwtdata.result.googleId === decodedToken.sub) {
          res.status(200).json(jwtdata);
        } else {
          res.status(401).json({message: "Unauthorized"})
        }
      } else {
        const verified = jwt.verify(jwtdata.token, secret);
        if (verified) {
          res.status(200).json(jwtdata);
        } else {
          res.status(401).json({message: "Unauthorized"})
        }
      }
    } catch (err) {
      console.error(`api, ${err}`);
      res.status(500).json({error: err});
    }
  }

  static async apiPostSignup(req, res, next) {
    try {
      const email = req.body.email;
      const userExists = await UsersDAO.getUserByEmail(email);
      if (userExists.user) {
        return res.status(400).json({message: "User already exists"});
      };

      const username = req.body.username;
      const givenName = req.body.givenName;
      const familyName = req.body.familyName;
      const name = req.body.name;
      const imageUrl = req.body.imageUrl;
      const password = req.body.password;
      const hashedPassword = await bcrypt.hashSync(password, 12);

      const userResponse = await UsersDAO.addUser(
        givenName,
        familyName,
        name,
        username,
        imageUrl,
        email,
        hashedPassword
      );

      const userRecord = await UsersDAO.getUserByEmail( email);
      console.log(userRecord)

      res.status(201).json({ message: "success" });
    } catch (err) {
      console.error(`api, ${err}`);
      res.status(500).json({ error: err });
    }
  }
}

module.exports = UsersController;
