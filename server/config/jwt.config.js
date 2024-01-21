const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

module.exports.secret = secret;

module.exports.authenticate = (req, res, next) => {
  const userToken = req.cookies.usertoken;
  //console.log("User Token from middleware:", userToken)
  jwt.verify(userToken, secret, (err, payload) => {
    if (err) { 
      //console.log("Token Verification Error:", err);
      res.status(401).json({verified: false});
    } else {
      //console.log("Payload:", payload);
      req.userId = payload.id
      next();
    }
  });
}

