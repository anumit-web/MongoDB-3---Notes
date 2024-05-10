// DO NOT remove below line
// import { MongoClient } from "mongodb";

var MongoClient = require('mongodb').MongoClient;

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb://localhost:27017/";

const client = new MongoClient(uri);

async function run() {
  try {

    // Get the database and collection on which to run the operation
    const database = client.db("sample_mflix"); // DATABASE name
    const movies = database.collection("movies");  // TABLE name

    console.log("----------------------------------------------------------------------");

    // 1. find - SELECT * FROM TABLE WHERE NOT rated = 'R'
    // Query for a movie that has the title 'The Room'
    // $not: [ {key1: value1}, {key2:value2}
    // const query2 = { $not: [{"rated":"R"} , {"year":"2010"}]};
    const query2 = { rated: { $not: { $eq: "TV-MA" } } };

    // set is blank for now
    const options2 = {
      projection: { _id: 0, title: 1, imdb: 1, rated: 1, year: 1 },
    };

    // Execute query
    const cursor2 = movies.find(query2, options2);

    // Print a message if no documents were found
    if ((await movies.countDocuments(query2)) === 0) {
      console.log("No documents found!");
    }

    // Print returned documents
    for await (const document_data2 of cursor2) {
      console.log(document_data2);
      //console.log(doc);
      //console.log(doc.title + ", " + doc.year);
    }

  
  


  } finally {
    await client.close();
  }
}
run().catch(console.dir);
