// DO NOT remove below line
// import { MongoClient } from "mongodb";

var MongoClient = require('mongodb').MongoClient;

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb://localhost:27017/";

const client = new MongoClient(uri);

// Count documents in a collection


async function run() {
  try {
    
    // Get the database and collection on which to run the operation
    const database = client.db("sample_mflix");
    const movies = database.collection("movies");

    // Specify the document field to find distinct values for
    const fieldName = "year";

    // Specify an optional query document to narrow results
    const query = { directors: "Barbra Streisand" };

    // Execute the distinct operation
    const distinctValues = await movies.distinct(fieldName, query);

    // Print the result
    console.log(distinctValues);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
