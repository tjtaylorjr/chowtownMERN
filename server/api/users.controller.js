const UsersDAO = require('../dao/usersDAO.js');

class UsersController {
  static async apiPostLogin(req, res, next) {
    const { email, password } = req.body;

    try {

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
