const express = require("express");
const postsRouter = require("./posts/posts-router");
const cors = require("cors");

// implement your server here

const server = express();

server.use(express.json());
server.use(cors());

// require your posts router and connect it here
server.use(postsRouter);


module.exports = server;
