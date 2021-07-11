const UsersDAO = require('../dao/usersDAO.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const secret = process.env.JWT_SECRET;

class UsersController {
  static async apiPostLogin(req, res, next) {
    const { email, password } = req.body;
    try {
      const userRecord = await UsersDAO.getUserByEmail(email);
      //console.log(userRecord)
      if(!userRecord.user) {
        return res.status(404).json({message: "User does not exist"});
      }

      const passwordMatch = await bcrypt.compare(password, userRecord.user.password);

      if(!passwordMatch) {
        return res.status(400).json({message: "Invalid credentials"});
      };
      const secret = userRecord.secret;
      //console.log(email, password, secret);
      const token = jwt.sign(
        {
          email: userRecord.user.email,
          id: userRecord.user._id
        },
        secret,
        { expiresIn: "1h" }
      );

      res.status(200).json({ result: userRecord.user, token });

    } catch (err) {
      console.error(`api, ${err}`);
      res.status(500).json({error: err});
    }
  }

  static async apiPostSignup(req, res, next) {
    try {
      const email = req.body.email;

      const userExists = await UsersDAO.getUserByEmail(email);

      if (userExists) {
        return res.status(400).json({message: "User already exists"});
      };

      const username = req.body.username;
      const firstname = req.body.firstname;
      const lastname = req.body.lastname;
      const hashedPassword = await bcrypt.hashSync(password, 12);

      const userResponse = await UsersDAO.addUser(
        email,
        username,
        hashedPassword,
        firstname,
        lastname
      );

      const userRecord = await UsersDAO.getUserByEmail( email);

      const token = jwt.sign(
        {
          email: userRecord.email,
          id: userRecord._id
        },
        secret,
        { expiresIn: "1h"}
      );

      res.status(201).json({ result: userRecord.user, token });
    } catch (err) {
      console.error(`api, ${err}`);
      res.status(500).json({ error: err });
    }
  }
}

module.exports = UsersController;
