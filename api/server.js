const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const server = express();

server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.send(`<h1>Que?</h1>`);
});

module.exports = server;
