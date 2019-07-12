const debug = require("debug")("app:startup");
const dwp = require("../dwp")
const dwpl = require('../dwp/project/code/main/dealWithPython')
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const {
    TwitterUser,
    validateUser
} = require('./twitterusers.model')

router.get('/:id', async (req, res) => {
    try {
        //talk to py and get new data
        console.log("here in get and id is", req.params.id)
        let data = await dwp("project\\code\\main\\usertracktest.py", req.params.id);
        data = JSON.parse(data)
        console.log("returned data", data)

        //var validator = require('is-my-json-valid')
        //console.log('should be valid', validator(data))
        //console.log("returned data", data, typeof data)
        /*var Model = createModelForName(req.params.id); // Create the model.
        var model = Model(data.items); // Create a model instance.
        model.save(function (err) { // Save
            if (err) {
                console.log(err);
            }
        });*/
        //if (!data) return res.status(404).send("not found user with this id");
        //let twitterUser = new TwitterUser(data)
        //xx check if not updated to db and update it    
        //twitterUser = await twitterUser.save();
        //send to front
        res.send(data);
        //debug("post a new user route", twitterUser);
    } catch (err) {
        console.log("error", err)
    }
});
var establishedModels = []

function createModelForName(name) {
    if (!(name in establishedModels)) {
        var Any = new mongoose.Schema({
            any: mongoose.Schema.Types.Mixed
        });
        establishedModels[name] = mongoose.model(name, Any);
    }
    return establishedModels[name];

}
router.get('/registed/:id', async (req, res) => {
    //check if it's his closed accounts
    //talk to db and check its updated
    //console.log("in alright")

    const twitterUser = await TwitterUser
        .findOne({
            name: req.params.id
        })
    //else update from py 
    //send to front 
    res.send(twitterUser);
});

//function update premium closed accounts repeatly


users = [{
    id: 3,
    name: 'mohammad'
}, {
    id: 2,
    name: 'ahmed'
}];

router.post('/', (req, res) => {
    const {
        error
    } = validateUser(req.body);
    if (error) {
        res.status(404).send(error.details[0].message);
        return;
    }
    const user = {
        id: users.length + 1,
        name: req.body.name
    }
    users.push(user);
    res.send(user);
});
router.put('/:id', (req, res) => {
    const user = users.find(c => c.id === parseInt(req.params.id));
    if (!user) return res.status(404).send("not found user with this id");
    const {
        error
    } = validateUser(req.body);
    if (error) {
        res.status(404).send(error.details[0].message);
        return;
    }
    user.name = req.body.name;
    res.send(user);
});


module.exports = router;