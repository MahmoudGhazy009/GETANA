path = require('path')
let theStringyData = '';

function dwp(pyfile, input) {
    const spawn = require("child_process").spawn;
    // here the file path, and the word you want to pass
    const pythonProcess = spawn("python", [path.join(__dirname, pyfile), input]);
    // this is a promise that gets the data returned from the python file
    return new Promise((resolve, error) => {
        console.log("in promise", path.join(__dirname, pyfile))
        pythonProcess.stdout.on("data", data => {
            theStringyData += data.toString();
        });
        pythonProcess.stdout.on("end", () => {
            try {
                returnedData = JSON.parse(theStringyData);
                resolve(returnedData);
            } catch (e) {
                console.log("error from dwp", e)
            }
        });
    })
}

module.exports = dwp;