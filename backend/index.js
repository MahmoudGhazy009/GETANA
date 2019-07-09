const debug = require("debug")("app:startup");
const config = require("config");
const Joi = require("joi");
const express = require("express");
const app = express();
const login = require("./middlewares/login");
const auth = require("./auth");
const home = require("./home/home");
const trends = require("./trends");
const hashtags = require("./hashtags");
const twitterusers = require("./twitterusers");
const users = require("./users");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");

if (!config.get('jwtPrivateKey')) {
  console.error("fetal error: jwtPrivateKey not defined")
  process.exit(1);
}
//console.log(`NODE_ENV:${process.env.NODE_ENV}`);
//console.log(`app:${app.get('env')}`);
app.use(express.json()); //for parsing raw json in req.bod
app.use(
  express.urlencoded({
    extended: true
  })
); //for parsing url encoded and extended to prse complex and arrays in req.bod
app.use(express.static("public")); //to make all files in public as it in root
app.use(helmet()); // to give more security to http requests

//console.log("app name:  " + config.get("name"));
//console.log("mail:  " + config.get('mail.host'));
//console.log("hhhhhhhhhhhhhhhhhhhhhhhhhh", config.get('jwtPrivateKey'))
if (app.get("env") === "development") {
  app.use(morgan("tiny")); // to log all http requests
  debug("morgan enabled");
}
//db work

mongoose
  .connect("mongodb://localhost/dbname", {
    useNewUrlParser: true
  })
  .then(() => console.log("Connected to Mongodb"))
  .catch(err => console.log("coulding connect", err));
debug("connected to db");

//my middlewares
app.use(login);

//routes
app.use("/api/", home);
app.use("/api/trends", trends);
app.use("/api/twitterusers", twitterusers);
app.use("/api/hashtags", hashtags);
app.use("/api/users", users);
app.use("/api/auth", auth);


const PORT = process.env.PORT || 3001;
app.listen(3001, () => console.log(`you are listen to ${PORT}`));