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

    // 1. find - SELECT * FROM TABLE
    // Query for a movie that has the title 'The Room'
    
    const query4 = {};

    // set is blank for now
    const options4 = {};

    // Execute query
    const result4 = await movies.findOne(query4, options4);
    console.log("Printing single document from a collection =>");
    console.log(result4);

    

    console.log("----------------------------------------------------------------------");

    // 1. find - SELECT * FROM TABLE
    // Query for a movie that has the title 'The Room'
    const query = {};

    // set is blank for now
    const options = {};

    // Execute query
    const cursor = movies.find(query, options);

    // Print a message if no documents were found
    if ((await movies.countDocuments(query)) === 0) {
      console.log("No documents found!");
    }

    // Print returned documents
    for await (const doc of cursor) {
      //console.dir(doc);
      //console.log(doc);
      console.log(doc.title + ", " + doc.year);
    }

    console.log("----------------------------------------------------------------------");

    // 2. find - SELECT COLUMN1, COLUMN2 FROM TABLE 
    // (show id field)
    // select only a few columns from the list
    const query2 = {};

    // set is blank for now
    const options2 = {
      projection: { _id: 1, title: 1, imdb: 1 },
    };

    // Execute query
    const cursor2 = movies.find(query2, options2);

    // Print a message if no documents were found
    if ((await movies.countDocuments(query2)) === 0) {
      console.log("No documents found!");
    }

    // Print returned documents
    for await (const doc2 of cursor2) {
      console.log(doc2);
      //console.log(doc.title + ", " + doc.year);
    }

    // 3. find - SELECT COLUMN1, COLUMN2 FROM TABLE 
    // (hide id field)
    // select only a few columns from the list
    const query3 = {};

    // set is blank for now
    const options3 = {
      projection: { _id: 0, title: 1, imdb: 1 },
    };

    // Execute query
    const cursor3 = movies.find(query3, options3);

    // Print a message if no documents were found
    if ((await movies.countDocuments(query3)) === 0) {
      console.log("No documents found!");
    }

    // Print returned documents
    for await (const doc of cursor3) {
      console.log(doc);
      //console.log(doc.title + ", " + doc.year);
    }

  } finally {
    await client.close();
  }
}
run().catch(console.dir);
