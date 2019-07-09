const debug = require("debug")("app:startup");
const express = require('express')
const router = express.Router();
const dwp = require("../dwp")
const {
    Hashtags,
    validateTag
} = require('./hashtag.model')

router.get('/:id', async (req, res) => {
    try {
        //talk to py and get new data
        //console.log("here in get and id is", req.params.id)
        const data = await dwp("project\\code\\main\\wordtrack.py", req.params.id);
        console.log("returned data", data)
        if (!data) return res.status(404).send("not found user with this id");
        data.name = req.params.id;
        let hashtag = new Hashtags(data)
        //xx check if not updated to db and update it    
        hashtag = await hashtag.save();
        //send to front
        res.send(hashtag);
        debug("post a new user route", hashtag);
    } catch (err) {
        console.log("error", err)
    }

});


router.get('premium/:id', (req, res) => {
    //check if it's his star hashtag
    //talk to db and  get data and store it
    //send to front with historical data
    res.send(`Hello ${req.params.id}`);
});

//function update premium star tags repeatly

router.post('/', (req, res) => {
    const {
        error
    } = validateTag(req.body);
    if (error) {
        res.status(404).send(error.details[0].message);
        return;
    }
    const tag = {
        id: tags.length + 1,
        name: req.body.name
    }
    //save
    tags.push(tag);
    //send to front
    res.send(tag);
});

router.put('/:id', (req, res) => {
    const tag = tags.find(c => c.id === parseInt(req.params.id));
    if (!tag) return res.status(404).send("not found user with this id");
    const {
        error
    } = validateTag(req.body);
    if (error) {
        res.status(404).send(error.details[0].message);
        return;
    }
    user.name = req.body.name;
    res.send(tag);
});


module.exports = router;