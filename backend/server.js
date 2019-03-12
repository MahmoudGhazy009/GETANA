const express = require("express");
//--------for connect with python file-------//
let {PythonShell} = require('python-shell');
let options = {
  mode:"json",
  pythonOptions: ['-u'], // get print results in real-time
  scriptPath: '',
  port:3001
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
const mongoose = require('mongoose');
/*
mongoose.connect('mongodb://Mahmoud_ghazy:Aa__01230123@cluster0-32eca.azure.mongodb.net/getana',optionss)
    .then(()=>console.log('Connected to Mongodb'))
    .catch(err=>console.log('coulding connect',err));*/
mongoose.connect('mongodb://localhost/getana')
    .then(()=>console.log('Connected to Mongodb'))
    .catch(err=>console.log('coulding connect',err));

const TweetSchema = new mongoose.Schema({
    name: String,
    tweet: String
});
//mongoose.model(collection_name,schema) return class
const Tweet = mongoose.model('tweets',TweetSchema);//
//==============================//


const app = express();
app.use(express.json());

const c = [{ id: 1, search: "l" }];

app.post("/api/HashTag",async (req, res) => {
const customer = {
    id: c.length + 1,
    search: req.body.search
  };
  c.push(customer);
  
    console.log(c[c.length - 1]["search"], "opopo");
//=====----communicate with python---//
const word=c[c.length - 1]["search"];

 sendToPython(word);
 res.send(c);
});
  //------------------------------//
function sendToPython(word){
    let pyshell = new PythonShell('compute.py',options);
    pyshell.send(word); 
    pyshell.on("message",function (message) {
      // received a message sent from the Python script (a simple "print" statement)
      k=JSON.parse(JSON.stringify(message));
      console.log("ggggggggg",JSON.parse(JSON.stringify(message)));
    });
    pyshell.end(async function (err) {
      if (err){
          throw err;
      };
      getTweets();
    console.log('finished',k[0]["name"]);
  });
}
  
  //console.log(c);
  

async function getTweets(){
    const tweets =await  Tweet.find();
        console.log("wwwwwwwwwww",tweets);
}


const port = 3001;
app.listen(port, () => console.log(`server started on port ${port}`));
