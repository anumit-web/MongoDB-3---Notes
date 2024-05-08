// node demo_create_mongo_db.js

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

console.log("started");


MongoClient.connect(url)
  .then((db) => {
    console.log('successfully...')
  })
  .catch((err) => {
    console.log('Failed...', err)
  })

console.log("end");
