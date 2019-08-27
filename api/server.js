const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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

module.exports = server;
