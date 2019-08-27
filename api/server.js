const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secrets = require("../config/secrets");

const Users = require("../users/users-model");

const server = express();

server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.send(`<h1>Que?</h1>`);
});

server.post("/api/register", async (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;
  const addedUser = await Users.add(user);

  try {
    res.status(201).json(addedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

server.post("/api/login", async (req, res) => {
  let { username, password } = req.body;
  const user = await Users.findBy({ username }).first();

  try {
    if (user && bcrypt.compareSync(password, user.password)) {
      token = genToken(user);
      res.status(200).json({ message: `Welcome ${user.username}`, token });
    } else {
      res.status(401).json({ message: "You shall not pass." });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

function genToken(user) {
  const payload = {
    subject: "user",
    username: user.username
  };
  const secret = secrets.jwtSecret;
  const options = {
    expiresIn: "1hr"
  };
  return jwt.sign(payload, secret, options);
}

module.exports = server;
