// DO NOT remove below line
// import { MongoClient } from "mongodb";

var MongoClient = require('mongodb').MongoClient;

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb://localhost:27017/";

const client = new MongoClient(uri);

/* Update multiple documents */

async function run() {
  try {
    // Get the "movies" collection in the "sample_mflix" database
    const database = client.db("sample_mflix");
    const movies = database.collection("movies");

    // Create a filter to update all movies with a 'G' rating
    const filter = { rated: "G" };

    // Create an update document specifying the change to make
    const updateDoc = {
      $set: {
        random_review: `After viewing I am ${
          100 * Math.random()
        }% more satisfied with life.`,
      },
    };
    // Update the documents that match the specified filter
    const result = await movies.updateMany(filter, updateDoc);
    console.log(`Updated ${result.modifiedCount} documents`);
  } finally {
    // Close the database connection on completion or error
    await client.close();
  }
}
run().catch(console.dir);
