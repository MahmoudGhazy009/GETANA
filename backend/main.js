// Load environment variable from .env file

const path = require("path");
const mongoAdapter = require("./dbAdapter/mongoAdapter");
const app = require("./server.js");

const dbUrl = "mongodb://localhost:27017";
const dbName = "test";
const port = 3001;
const secret = "secret";

const dbAdapter = mongoAdapter(dbUrl, dbName);

dbAdapter.connect().then(async _ => {
  app(port, secret, dbAdapter);
});
