const User = require('../models/user.model'); // Adjust the path as per your project structure
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports.register = async(req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("User already registered.");
  }

  User.create(req.body)
    .then(user => {
      const userToken = jwt.sign({
        id: user._id
      }, process.env.SECRET_KEY);
      res
        .cookie("usertoken", userToken, {
          httpOnly: true
        })
        .json({ msg: "success!", user: user });
    })
    .catch(err => response.status(400).json(err))
};

module.exports.login = async(req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user == null) {
    return res.sendStatus(400)
  }

  const correctPW = await bcrypt.compare(req.body.password, user.password);
  if (!correctPW) {
    return res.sendStatus(400)
  }

  const userToken = jwt.sign({
    id: user._id
  }, process.env.JWT_SECRET);

  res
    .cookie("usertoken", userToken, {
      httpOnly: true
    })
    .json({ msg: "success!" });
}

module.exports.logout = (req, res) => {
  res.clearCookie('usertoken');
  res.sendStatus(200);
}

module.exports.getUsers = (req, res) => { //used for testing
  User.find({})
      .then( allUsers => res.json(allUsers) )
      .catch( err => res.json(err) )
}
