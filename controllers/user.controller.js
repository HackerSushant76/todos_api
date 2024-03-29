const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user === null) {
    res.status(401).send("Wrong credentials");
  } else {
    const hash = user.password;
    const name = user.name;
    const userId = user._id;
    bcrypt.compare(password, hash, function (err, result) {
      if (result) {
        const token = jwt.sign({ id: userId }, process.env.secret_key);
        res.send({ msg: "Login successful", name, token: token });
      } else {
        res.status(401).send("Wrong credentials");
      }
    });
  }
};

const userSignup = async (req, res) => {
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) {
    res.send("User already exists");
  } else {
    bcrypt.hash(password, 4, async function (err, hash) {
      if (err) {
        res.send("Something went wrong, please signup later");
      } else {
        const user = new User({ name, email, password: hash });
        await user.save();
        const user1 = await User.findOne({ email: email });
        const userId = user1._id;
        const token = jwt.sign({ id: userId }, process.env.secret_key);
        res.send({
          msg: "User Registration and Login Successful",
          name,
          token: token,
        });
      }
    });
  }
};

module.exports = { userSignup, userLogin };
