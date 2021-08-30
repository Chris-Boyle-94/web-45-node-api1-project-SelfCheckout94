// BUILD YOUR SERVER HERE
const express = require("express");
const User = require("./users/model");

const server = express();

server.use(express.json());

server.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({
      message: "Unable to retrieve user list.",
      error: err.message,
    });
  }
});

server.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    !user
      ? res.status(404).json({
          message: `No user found by id: ${req.params.id}`,
        })
      : res.json(user);
  } catch (err) {
    res.status(500).json({
      message: "Unable to retrieve specified user.",
      error: err.message,
    });
  }
});

server.post("/api/users", async (req, res) => {
  try {
    if (!req.body.name || !req.body.bio) {
      res.status(400).json({
        message: "provide name and bio",
      });
    } else {
      const newUser = await User.insert(req.body);
      res.status(201).json(newUser);
    }
  } catch (err) {
    res.status(500).json({
      message: "Unable to add new user to the database.",
      error: err.message,
    });
  }
});

server.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const updatedUser = await User.update(id, body);
    !updatedUser
      ? res.status(404).json({
          message: `No user found with the id of ${id}`,
        })
      : res.json(updatedUser);
  } catch (err) {
    res.status(500).json({
      message: "Unable to update any user.",
      error: err.message,
    });
  }
});

module.exports = server;
