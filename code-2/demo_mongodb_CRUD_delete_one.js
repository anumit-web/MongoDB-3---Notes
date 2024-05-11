// DO NOT remove below line
// import { MongoClient } from "mongodb";

var MongoClient = require('mongodb').MongoClient;

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb://localhost:27017/";

const client = new MongoClient(uri);

// Delete a document

async function run() {
  try {
    const database = client.db("sample_mflix");
    const movies = database.collection("movies");

    /* Delete the first document in the "movies" collection that matches
    the specified query document */
    const query = { title: "From Hand to Mouth" };
    const result = await movies.deleteOne(query);

    /* Print a message that indicates whether the operation deleted a
    document */
    if (result.deletedCount === 1) {
      console.log("Successfully deleted one document.");
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    }
  } finally {
    // Close the connection after the operation completes
    await client.close();
  }
}
// Run the program and print any thrown exceptions
run().catch(console.dir);
