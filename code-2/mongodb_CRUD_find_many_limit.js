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

    // 1. find - SELECT * FROM TABLE ORDER BY year ASC
    // Query for a movie that has the title 'The Room'
    // $not: [ {key1: value1}, {key2:value2}
    // const query2 = { $not: [{"rated":"R"} , {"year":"2010"}]};
    const query2 = { } ;
    const limit2 = 10;

    // set is blank for now
    const options2 = {
      sort: { year: 1 },
      projection: { _id: 0, title: 1, imdb: 1,  year: 1 },
    };

    // Execute query
    const cursor2 = movies.find(query2, options2).limit(limit2);

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

    console.log("----------------------------------------------------------------------");

    // 1. find - SELECT * FROM TABLE ORDER BY awards.wins ASC
    // Query for a movie that has the title 'The Room'
    // $not: [ {key1: value1}, {key2:value2}
    // const query2 = { $not: [{"rated":"R"} , {"year":"2010"}]};
    const query3 = { } ;
    
    // set is blank for now
    const options3 = {
      sort: { "awards.wins": -1 },
      limit: 10,
      projection: { _id: 0, title: 1, imdb: 1,  year: 1 , awards: 1},
    };

    // Execute query
    const cursor3 = movies.find(query3, options3);

    // Print a message if no documents were found
    if ((await movies.countDocuments(query3)) === 0) {
      console.log("No documents found!");
    }

    // Print returned documents
    for await (const document_data3 of cursor3) {
      console.log(document_data3);
      //console.log(doc);
      //console.log(doc.title + ", " + doc.year);
    }

    
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
