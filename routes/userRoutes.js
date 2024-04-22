const express = require('express');
const tokenVerification = require('../middleware/authMiddleware');
const {signin} = require('../controllers/authController');
const { signup } = require("../controllers/authController");

const userRouter = express.Router();
userRouter.post("/signup", signup, function (req, res) {
});

userRouter.post("/signin", signin, function (req, res) {
});

userRouter.get("/content", tokenVerification, function (req, res) {
    if (user) {
      res.status(200)
        .send({
          message: "view content"
        });
    } else {
      res.status(403)
        .send({
          message: "Unauthorised access"
        });
    }
  });

module.exports = {userRouter};
