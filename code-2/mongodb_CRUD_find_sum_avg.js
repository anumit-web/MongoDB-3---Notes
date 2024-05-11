// DO NOT remove below line
// import { MongoClient } from "mongodb";

var MongoClient = require('mongodb').MongoClient;

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb://localhost:27017/";

const client = new MongoClient(uri);

async function run() {
  try {


    console.log("----------------------------------------------------------------------");

    // Get the database and collection on which to run the operation
    const database = client.db("sample_mflix"); // DATABASE name
    const movies = database.collection("movies");  // TABLE name

    console.log("----------------------------------------------------------------------");

    // 1. find - SELECT year, SUM(awards.wins) FROM TABLE WHERE countries = "Spain" group by year ORDER BY year asc
    const query7 = {};

    // set is blank for now
    const options7 = {    };

    const cursor7 = await database.collection('movies').aggregate([
      {
        $match: { countries: "Spain" }
      },
      { $group: { _id: "$year", "Movies count in year for Spain": { $sum: "$awards.wins" } } } ,
      { 
        $sort: { _id: 1 } /* sort by year */
      }
    ])

    // Print returned documents
    for await (const document_data7 of cursor7) {
      console.log(document_data7);
    }

    console.log("----------------------------------------------------------------------");

    // 1. find - SELECT year, AVG(awards.wins) FROM TABLE WHERE countries = "Spain" group by year ORDER BY year asc
    const query8 = {};

    // set is blank for now
    const options8 = {    };

    const cursor8 = await database.collection('movies').aggregate([
      {
        $match: { countries: "Spain" }
      },
      { $group: { _id: "$year", "Movie award wins average per year for Spain": { $avg: "$awards.wins" } } } ,
      { 
        $sort: { _id: 1 } /* sort by year */
      }
    ])

    // Print returned documents
    for await (const document_data8 of cursor8) {
      console.log(document_data8);
    }


  } finally {
    await client.close();
  }
}
run().catch(console.dir);
