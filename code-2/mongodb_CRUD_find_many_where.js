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

      

    console.log("----------------------------------------------------------------------");

    // 1. find - SELECT * FROM TABLE
    // Query for a movie that has the title 'The Room'
    const query = {};

    // set is blank for now
    const options = {
      projection: { _id: 0, title: 1, imdb: 1 },
    };

    // Execute query
    const cursor = movies.find(query, options);

    // Print a message if no documents were found
    if ((await movies.countDocuments(query)) === 0) {
      console.log("No documents found!");
    }

    // Print returned documents
    for await (const document_data of cursor) {
      console.log(document_data);
      //console.log(doc);
      //console.log(doc.title + ", " + doc.year);
    }

    
    console.log("----------------------------------------------------------------------");

    // 1. find - SELECT * FROM TABLE WHERE rated = 'TV-G'
    // Query for a movie that has the title 'The Room'
    const query2 = {"rated": "TV-G"};

    // set is blank for now
    const options2 = {
      projection: { _id: 0, title: 1, imdb: 1, rated: 1 },
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
    
    console.log("----------------------------------------------------------------------");

    // 1. find - SELECT * FROM TABLE WHERE year > 1990
    // Query for a movie that has the title 'The Room'
    const query3 = {"year": {$gt:1990}};

    // set is blank for now
    const options3 = {
      projection: { _id: 0, title: 1, imdb: 1, rated: 1, year: 1 },
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
    }
  
    console.log("----------------------------------------------------------------------");

    // 1. find - SELECT * FROM TABLE WHERE rated in ("TV-G", "R", "PASSED")
    // Query for a movie that has the title 'The Room'
    const query4 = {"rated": {$in:["TV-G", "R", "PASSED"] } };

    // set is blank for now
    const options4 = {
      projection: { _id: 0, title: 1, imdb: 1, rated: 1, year: 1, tomatoes: 1 },
    };

    // Execute query
    const cursor4 = movies.find(query4, options4);

    // Print a message if no documents were found
    if ((await movies.countDocuments(query4)) === 0) {
      console.log("No documents found!");
    }

    // Print returned documents
    for await (const document_data4 of cursor4) {
      console.log(document_data4);
    }
   

  } finally {
    await client.close();
  }
}
run().catch(console.dir);
