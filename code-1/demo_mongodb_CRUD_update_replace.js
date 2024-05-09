// DO NOT remove below line
// import { MongoClient } from "mongodb";

var MongoClient = require('mongodb').MongoClient;

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb://localhost:27017/";

const client = new MongoClient(uri);

/* Update multiple documents */

async function run() {
  try {

    // Get the database and collection on which to run the operation
    const database = client.db("sample_mflix");
    const movies = database.collection("movies");

    // Create a query for documents where the title contains "The Cat from"
    const query = { title: { $regex: "The Cat from" } };

    // Create the document that will replace the existing document
    const replacement = {
      title: `The Cat from Sector ${Math.floor(Math.random() * 1000) + 1}`,
    };

    // Execute the replace operation
    const result = await movies.replaceOne(query, replacement);

    // Print the result 
    console.log(`Modified ${result.modifiedCount} document(s)`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
