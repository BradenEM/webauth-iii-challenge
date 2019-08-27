const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");

const Users = require("../users/users-model");

module.exports = (req, res, next) => {
  const tokenHeader = req.headers.authorization;

  if (tokenHeader) {
    const tokenStrings = tokenHeader.split(" ");
    if (tokenStrings[0].toUpperCase() === "BEARER" && tokenStrings[1]) {
      jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
        if (err) {
          res
            .status(401)
            .json({ message: "token verification failed", error: err });
        } else {
          req.decodedJwt = decodedToken;
          next();
        }
      });
    } else {
      res
        .status(401)
        .json({ message: "invalid scheme, or no taken after scheme name" });
    }
  } else {
    res.status(401).json({ message: "missing authorization header" });
  }
};
