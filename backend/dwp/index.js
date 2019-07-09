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
            theStringyData += data.toString()
        });
        pythonProcess.stdout.on("end", () => {
            console.log(theStringyData)

            try {
                theStringyData = theStringyData.replace(/\\n/g, "\\n")
                    .replace(/\\'/g, "\\'")
                    .replace(/\\"/g, '\\"')
                    .replace(/\\&/g, "\\&")
                    .replace(/\\r/g, "\\r")
                    .replace(/\\t/g, "\\t")
                    .replace(/\\b/g, "\\b")
                    .replace(/\\f/g, "\\f");
                // remove non-printable and other non-valid JSON chars
                theStringyData = theStringyData.replace(/[\u0000-\u0019]+/g, "");
                returnedData = JSON.parse(theStringyData);
                resolve(returnedData);
            } catch (e) {
                console.log("error from dwp", e)
            }
        });
    })
}

module.exports = dwp;