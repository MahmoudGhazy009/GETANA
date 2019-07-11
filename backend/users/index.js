const auth = require("../middlewares/auth");
const role = require("../middlewares/role");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const debug = require("debug")("app:startup");
const express = require("express");
const router = express.Router();
const {
  User,
  validateUser
} = require("./user.model");

router.get("/", [auth, role], async (req, res) => {
  const allUsers = await User.find();
  res.send(allUsers);
  debug("get all user route", allUsers);
  /*res.send({
    "name": "hamada"
  })*/
});

router.post("/", async (req, res) => {
  console.log(req.body, "thi is the body")
  const {
    error
  } = validateUser(req.body);
  if (error) {
    console.log(error.details[0].message)
    res.status(404).send(error.details[0].message);
    return;
  }

  let user = await User.findOne({
    email: req.body.email
  });
  if (user) {
    console.log("error of already exist")
    return res.status(400).send({
      "message": "User already registered."
    });
  }
  user = new User(_.omit(req.body));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  /* youn need to let it at another place not at registeration

  
  ,tags: req.body.tags,
  profiles: req.body.profiles*/
  // console.log(user, "eeeeeeeeeeeeeee")
  try {
    user = await user.save();
    const token = user.generateAuthToken();
    console.log("aaaaaaaaaaaaaa", token);

    res
      .header("x-auth-token", token)
      .send(
        _.pick(user, [
          "_id",
          "firstName",
          "lastName",
          "twitterUserName",
          "email"
        ])
      );
    debug("post a new user route", user);
  } catch (ex) {
    //for (Field in ex.errors) console.log(ex.errors[Field].message);
    console.log("moongoose validation error", ex);
    res.send();
  }
});

router.put("/:id", async (req, res) => {
  //you need to handle validation fn for update user data
  /*const { error } = validateUser(req.body);
  if (error) {
    return res.status(404).send(error.details[0].message);
  }*/
  let data = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.id, {
      $set: data
    }, {
      new: true,
      useFindAndModify: false
    }
  );
  if (!user) return res.status(404).send("not found user with this id");
  res.send(user);
  debug("update name of spesific user by id route", user);
});

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (!user) return res.status(404).send("not found user with this id");
  res.send(user);
  debug("get single user by id", user);
});

module.exports = router;