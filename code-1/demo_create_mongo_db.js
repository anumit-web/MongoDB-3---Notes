var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

console.log("started");

// MongoClient.connect(url, function (err, db) {
//     console.log("connect now");

//     if (err) { 
//         console.log("error");
//         throw err; 
//     }
    
//     console.log("Database created!");

//     db.close();
// });

// MongoClient.connect(url,{ useNewUrlParser: true ,useUnifiedTopology:true},function(err,connect) {
//   if(err){
//     console.log("Error!")
//   } else {
//     console.log('Database connected.')
//   }
// })

MongoClient.connect(url)
  .then((db) => {
    console.log('successfully...')
  })
  .catch((err) => {
    console.log('Failed...', err)
  })

console.log("end");
