path = require('path')
let theStringyData = '';
buffer3 = new Buffer('')

function dwp(pyfile, input) {
    const spawn = require("child_process").spawn;
    // here the file path, and the word you want to pass
    const pythonProcess = spawn("python", [path.join(__dirname, pyfile), input]);
    // this is a promise that gets the data returned from the python file
    return thePromise = new Promise((resolve, error) => {
        pythonProcess.stdout.on("data", data => {
            theStringyData += data.toString();
            /*theStringyData = theStringyData
              .replace(/\\n/g, "\\n")
              .replace(/\\'/g, "\\'")
              .replace(/\\"/g, '\\"')
              .replace(/\\&/g, "\\&")
              .replace(/\\r/g, "\\r")
              .replace(/\\t/g, "\\t")
              .replace(/\\b/g, "\\b")
              .replace(/\\f/g, "\\f");
            // remove non-printable and other non-valid JSON chars
            theStringyData = theStringyData.replace(/[\u0000-\u0019]+/g, "");*/
            resolve(theStringyData);
        });
    })

}

module.exports = dwp;