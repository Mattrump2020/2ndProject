const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../db/models/user");

exports.signup = (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    role: req.body.role,
    password: bcrypt.hashSync(req.body.password, 10)
  });

  try {
    user.save().then(newUser => {
       res.status(200).send({ message: "User Created successfully>>>" });
    })
 } catch (error) {
   res.status(500).send({ message: error });
 }
};

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email }).exec()
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: "User not found" });
        }
  
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
  
        if (!passwordIsValid) {
          return res.status(401).send({ accessToken: null, message: "Invalid Password!" });
        }
  
        const token = jwt.sign({ id: user.id }, process.env.API_SECRET, { expiresIn: 86400 });
  
        res.status(200).send({
          user: { id: user._id, email: user.email, firstName: user.firstName },
          message: "Logged in successfully",
          accessToken: token,
        });
      })
      .catch(err => {
        console.error(err);
        res.status(500).send({ message: 'Error: user not found' });
      });
  };
  
