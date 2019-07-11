const mongoose = require("mongoose");
const express = require("express");

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

exports.trendSchema = trendSchema;
exports.Trend = Trend;