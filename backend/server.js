const express = require("express");
//--------for connect with python file-------//
let { PythonShell } = require("python-shell");
let options = {
  mode: "json",
  pythonOptions: ["-u"], // get print results in real-time
  scriptPath: "",
  port: 3001
};

//=======================//
/*
const optionss = {
  useMongoClient: true,
  autoIndex: false, // Don't build indexes
  reconnectTries: 100, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  useNewUrlParser: true
};*/
const mongoose = require("mongoose");
/*
mongoose.connect('mongodb://Mahmoud_ghazy:Aa__01230123@cluster0-32eca.azure.mongodb.net/getana',optionss)
    .then(()=>console.log('Connected to Mongodb'))
    .catch(err=>console.log('coulding connect',err));*/
mongoose
  .connect("mongodb://localhost/getana")
  .then(() => console.log("Connected to Mongodb"))
  .catch(err => console.log("coulding connect", err));

const TweetSchema = new mongoose.Schema({
  name: String,
  tweet: String
});
//mongoose.model(collection_name,schema) return class
const Tweet = mongoose.model("tweets", TweetSchema); //
//==============================//

const app = express();
app.use(express.json());

const c = [{ id: 1, search: "l" }];
let tweets = "";
//let k={};
app.post("/api/HashTag", async (req, res) => {
  const customer = {
    id: c.length + 1,
    search: req.body.search
  };
  c.push(customer);

  console.log(c[c.length - 1]["search"], "opopo");
  //=====----communicate with python---//
  const word = c[c.length - 1]["search"];

  tweets = await sendToPython(word, res, tweets);
  await console.log("fffffff", tweets);
  //res.send(c);
});
//------------------------------//
async function sendToPython(word, res, tweets) {
  let pyshell = new PythonShell("try.py", options);
  pyshell.send(word);
  pyshell.on("message", function(message) {
    // received a message sent from the Python script (a simple "print" statement)
    k = JSON.parse(JSON.stringify(message));
    console.log("ggggggggg", JSON.parse(JSON.stringify(message)));
  });
  pyshell.end(async function(err) {
    if (err) {
      throw err;
    }
    //tweets = await getTweets();
    res.send(k);
    //return tweets
    //console.log('finished',k[0]["name"]);
  });
}

//console.log(c);

async function getTweets(res) {
  return (tweets = await Tweet.find());

  console.log("wwwwwwwwwww", tweets);
  //res.send(tweets);
}
////////////////////////////////////////////////////////////////

app.post("/api/Person", async (req, res) => {
  const customer = {
    id: c.length + 1,
    search: req.body.search
  };
  c.push(customer);

  console.log(c[c.length - 1]["search"], "opopo");
  //=====----communicate with python---//
  const word = c[c.length - 1]["search"];

  tweets = await sendToPython2(word, res, tweets);
  await console.log("fffffff", tweets);
  //res.send(c);
});
//------------------------------//
async function sendToPython2(word, res, tweets) {
  let pyshell = new PythonShell("user.py", options);
  pyshell.send(word);
  pyshell.on("message", function(message) {
    // received a message sent from the Python script (a simple "print" statement)
    k = JSON.parse(JSON.stringify(message));
    console.log("ggggggggg", JSON.parse(JSON.stringify(message)));
  });
  pyshell.end(async function(err) {
    if (err) {
      throw err;
    }
    //tweets = await getTweets2();
    res.send(k);
    //return tweets
    //console.log('finished',k[0]["name"]);
  });
}

//console.log(c);

async function getTweets2(res) {
  return (tweets = await Tweet.find());

  console.log("wwwwwwwwwww", tweets);
  //res.send(tweets);
}

/////////////////////////////////////////////////////////////////////////////////////

const port = 3001;
app.listen(port, () => console.log(`server started on port ${port}`));
