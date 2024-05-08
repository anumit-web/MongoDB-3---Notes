// node demo_mongodb_createcollection.js

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

console.log("started");

MongoClient.connect(url)
    .then((db) => {
        console.log('successfully...')

        var adminDb = db.db('test').admin();
        // db.admin.listDatabases();
        // List all the available databases
        adminDb.listDatabases(function (err, result) {

            assert.equal(null, err);
            assert.ok(dbs.databases.length > 0);

            // console.log("before showing databases");
            // console.log(result);
            // console.log('list databases here');
            // console.log(result.databases);
            //db.close();
        });

        // var dbo = db.db("sample_mflix");
        // console.log('conect sample_mflix')

        // dbo.collection("movies").findOne({}, function(err, result) {
        //     if (err) throw err;
        //     console.log(result.title);
        //     db.close();
        //   });


    })
    .catch((err) => {
        console.log('Failed...', err)
    })

console.log("end");




