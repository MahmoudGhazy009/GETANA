const express = require("express");
const utf8 = require("utf8");

//--------for connect with python file-------//
let { PythonShell } = require("python-shell");
let options = {
  mode: "json",
  pythonOptions: ["-u"], // get print results in real-time
  scriptPath: "",
  port: 3001
};

//=======================//
const mongoose = require("mongoose");
/*
mongoose.connect('mongodb://Mahmoud_ghazy:Aa__01230123@cluster0-32eca.azure.mongodb.net/getana',optionss)
    .then(()=>console.log('Connected to Mongodb'))
    .catch(err=>console.log('coulding connect',err));*/
mongoose
  .connect("mongodb://localhost/getana")
  .then(() => console.log("Connected to Mongodb"))
  .catch(err => console.log("coulding connect", err));

//==============================//

const app = express();
app.use(express.json());

const impo = require("./dealWithPython");

let tweets = "";
app.post("/api/HashTag", async (req, res) => {
  console.log(req.body.search, "opopo");
  //=====----communicate with python---//
  const word = req.body.search;
  tweets = await impo.dealWithPython("pr/code/main/try.py", word, res);
  await console.log("fffffff", tweets);
  //res.send(c);
});
//------------------------------//

//console.log(c);

let person = "";
app.post("/api/Person", async (req, res) => {
  const word = req.body.search;

  person = await impo.dealWithPython("pr/code/main/usertrack.py", word, res);

  console.log(person);

  await console.log("fffffff", person);
  //res.send(c);
});
const port = 3001;
app.listen(port, () => console.log(`server started on port ${port}`));
