const User = require('../models/User'); // Adjust the path as per your project structure

module.exports.register = (req, res) => {
  User.create(req.body)
    .then(user => {
        res.json({ msg: "success!", user: user });
    })
    .catch(err => res.status(400).json(err)); // Sending back validation errors
};
