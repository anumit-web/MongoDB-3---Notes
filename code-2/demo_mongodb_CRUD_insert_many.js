// DO NOT remove below line
// import { MongoClient } from "mongodb";

var MongoClient = require('mongodb').MongoClient;

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb://localhost:27017/";

const client = new MongoClient(uri);

async function run() {

  try {

    // Get the database and collection on which to run the operation
    const database = client.db("insertDB");
    const foods = database.collection("foods");

    // Create an array of documents to insert
    const docs = [
      { name: "cake", healthy: false },
      { name: "lettuce", healthy: true },
      { name: "donut", healthy: false }
    ];

    // Prevent additional documents from being inserted if one fails
    const options = { ordered: true };

    // Execute insert operation
    const result = await foods.insertMany(docs, options);

    // Print result
    console.log(`${result.insertedCount} documents were inserted`);

  } finally {
    await client.close();
  }
}

run().catch(console.dir);