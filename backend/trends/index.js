const debug = require("debug")("app:startup");
const mongoose = require("mongoose");
const express = require('express')
const router = express.Router();
const dwp = require("../dwp")

//xxx: ask khaled to add only highest retweeted tweets
// you need function to get updated data for each trend
const trendSchema = new mongoose.Schema({
    name: String,
    // cords: [String],
    trends: [{
        name: String,
        tweet_volume: Number,
        //tweets: [Object]
    }],
    date: {
        type: Date,
        default: Date.now
    }
});
const Trend = mongoose.model('Trend', trendSchema);

router.get('/', async (req, res) => {
    let allTrends = await Trend.find();
    /*    let data = await dwp("project\\code\\main\\trendstry.py", "0") //"test.py", "egypt") //
        console.log("returnned from pyrhon", typeof data)
        console.log("returnned from pyrhon", data.trends)
        console.log("returnned from pyrhon", data.trends[0])
        let allTrends = ''
        for (var trend in data.trends) {
            console.log(data.trends[trend], `here is${trend} `);

            trnd = new Trend(data.trends[trend])
            trnd = await trnd.save()
            allTrends = await Trend.find();
        }
    */
    res.send(allTrends);
    /*
        data = new Trend(data)
        data = await data.save()
        const allTrends = await Trend.find();
        res.send(allTrends);
        debug("get all trends route", allTrends);
        console.log("get all trends route", allTrends, "Sdssss", data);
        //get all trends from db
        */
});


router.get('/:country', async (req, res) => {
    //check if country is exist
    const countryTrends = await Trend
        .findOne({
            name: req.params.country
        })
        .sort({
            freq: 1
        })
        .select({
            trends: 1
        })

    //get its trends from db
    res.send(countryTrends);
});

router.get('/:country/:trend', (req, res) => {
    //search for trend from the specific location
    //send result
});

router.post("/", async (req, res) => {
    //if you dont need validate
    /*const { error } = validateUser(req.body);
    if (error) {
      res.status(404).send(error.details[0].message);
      return;
    }*/
    const data = await dwp("twitterusers.py", req.params.id);
    console.log("returned data", data)
    let trend = new Trend(req.body);
    try {
        trend = await trend.save();
        res.send(trend);
        debug("post a new user route", trend);
    } catch (ex) {
        //for (Field in ex.errors) console.log(ex.errors[Field].message);
        console.log("moongoose validation error");
        res.send();
    }
});


module.exports = router;