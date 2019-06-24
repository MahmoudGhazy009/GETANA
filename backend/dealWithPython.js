let { PythonShell } = require("python-shell");
let options = {
  mode: "json",
  pythonOptions: ["-u"], // get print results in real-time
  scriptPath: "",
  port: 3001
};

module.exports = {
  dealWithPython: async function(pyFile, word, res) {
    let pyshell = new PythonShell(pyFile, options);
    pyshell.send(encodeURI(word));
    pyshell.on("message", function(message) {
      // received a message sent from the Python script (a simple "print" statement)
      k = JSON.parse(JSON.stringify(message));
    });
    pyshell.end(async function(err) {
      if (err) {
        console.log(err);
        throw err;
      }
      //console.log(k);
      res.send(k);
    });
  }
};
