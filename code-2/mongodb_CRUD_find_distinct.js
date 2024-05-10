// DO NOT remove below line
// import { MongoClient } from "mongodb";

var MongoClient = require('mongodb').MongoClient;

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb://localhost:27017/";

const client = new MongoClient(uri);

async function run() {
  try {


    console.log("----------------------------------------------------------------------");

    // Get the database and collection on which to run the operation
    const database = client.db("sample_mflix"); // DATABASE name
    const movies = database.collection("movies");  // TABLE name


     // 1. find - SELECT COUNT(*) FROM TABLE WHERE genres = 'Drama'
    // Query for a movie that has the title 'The Room'
    // $not: [ {key1: value1}, {key2:value2}
    // const query2 = { $not: [{"rated":"R"} , {"year":"2010"}]};
    const query4 = { };

    // set is blank for now
    const options4 = {      
    };

    // Print returned documents
    const cursor4 = await movies.distinct("rated", query4, options4);
    
    for await (const document4 of cursor4) {
      console.log(document4);
    }



  } finally {
    await client.close();
  }
}
run().catch(console.dir);
