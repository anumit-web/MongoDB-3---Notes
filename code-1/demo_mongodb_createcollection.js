// node demo_mongodb_createcollection.js

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

console.log("started");

MongoClient.connect(url)
    .then((db) => {
        console.log('successfully...')

        var dbo = db.db("sampledb1");
        dbo.createCollection("customers", function (err, res) {
            if (err) throw err;
            console.log("Collection created!");
            db.close();
        });
    })
    .catch((err) => {
        console.log('Failed...', err)
    })

console.log("end");




