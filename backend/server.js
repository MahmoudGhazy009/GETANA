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

const app = express();
app.use(express.json());

const c = [{ id: 1, search: "l" }];

app.post("/api/HashTag", (req, res) => {
  let pyshell = new PythonShell('compute.py',options);

  const customer = {
    id: c.length + 1,
    search: req.body.search
  };
  c.push(customer);
  {
    console.log(c[c.length - 1]["search"], "opopo");
//=====----communicate with python---//
    const word=c[c.length - 1]["search"];
    pyshell.send(word); 
    pyshell.on("message",async function (message) {
      // received a message sent from the Python script (a simple "print" statement)
      k= JSON.parse(JSON.stringify(message));
      console.log(JSON.parse(JSON.stringify(message)));
    });
    pyshell.end(function (err) {
      if (err){
          throw err;
      };
    console.log('finished',k[0]["name"]);});
    //------------------------------//
    res.send(c);
    console.log(c);
  }
});

const port = 3001;
app.listen(port, () => console.log(`server started on port ${port}`));
