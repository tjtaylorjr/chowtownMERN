const UsersDAO = require('../dao/usersDAO.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

class UsersController {
  static async apiPostLogin(req, res, next) {
    const { email, password } = req.body;
    //console.log(secret);

    try {
      const userRecord = await UsersDAO.getUserByEmail({ email });

      if(!userRecord) {
        return res.status(404).json({message: "User does not exist"});
      }

      const passwordMatch = await bcrypt.compare(password, userRecord.password);

      if(!passwordMatch) return res.status(400).json({message: "Invalid credentials"})

      const token = jwt.sign({email: userRecord.email, id: userRecord._id}, secret, { expiresIn: "1h" });

      res.status(200).json({ result: userRecord, token });

    } catch (err) {
      console.error(`api, ${err}`);
      res.status(500).json({error: err});
    }
  }

  static async apiPostSignup(req, res, next) {
    try {

    } catch (err) {
      console.error(`api, ${err}`);
      res.status(500).json({ error: err });
    }
  }
}

module.exports = UsersController;
