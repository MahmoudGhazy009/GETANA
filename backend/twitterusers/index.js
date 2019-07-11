const debug = require("debug")("app:startup");
const dwp = require("../dwp")
const express = require('express')
const router = express.Router();
const {
    TwitterUser,
    validateUser
} = require('./twitterusers.model')

router.get('/:id', async (req, res) => {
    try {
        //talk to py and get new data
        //console.log("here in get and id is", req.params.id)
        const data = await dwp("project\\code\\main\\usertrack.py", req.params.id);
        console.log("returned data", data)
        if (!data) return res.status(404).send("not found user with this id");
        let twitterUser = new TwitterUser(data)
        //xx check if not updated to db and update it    
        twitterUser = await twitterUser.save();
        //send to front
        res.send(twitterUser);
        debug("post a new user route", twitterUser);
    } catch (err) {
        console.log("error", err)
    }

});

router.get('premium/:id', (req, res) => {
    //check if it's his closed accounts
    //talk to db and check its updated
    //else update from py 
    //send to front 
    res.send(`Hello ${req.params.id}`);
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