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

    // 1. find - SELECT * FROM TABLE
    // Query for a movie that has the title 'The Room'
    const query = { };

    // set is blank for now
    const options = {
    };

    // Execute query
    const movie = await movies.findOne(query, options);

    // Print the document returned by findOne()
    console.log(movie);
    //
    console.log(movie.title);
    //
    console.log(movie.year);
    //
    console.log(movie.rated);

    
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
