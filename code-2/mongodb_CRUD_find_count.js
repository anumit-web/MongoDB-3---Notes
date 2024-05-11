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


    // 1. find - SELECT COUNT(*) FROM TABLE 
    // Query for a movie that has the title 'The Room'
    // $not: [ {key1: value1}, {key2:value2}
    // const query2 = { $not: [{"rated":"R"} , {"year":"2010"}]};
    const query3 = {};

    // set is blank for now
    const options3 = {
      projection: { _id: 0, title: 1, imdb: 1, year: 1 },
    };

    // Execute query
    const cursor3 = movies.find(query3, options3);

    // Print a message if no documents were found
    if ((await movies.countDocuments(query3)) === 0) {
      console.log("No documents found!");
    }

    // Print returned documents
    const countNumber = await movies.countDocuments(query3, options3);
    console.log("Number of movies " + countNumber);

    console.log("----------------------------------------------------------------------");

    // 1. find - SELECT COUNT(*) FROM TABLE WHERE genres = 'Drama'
    // Query for a movie that has the title 'The Room'
    // $not: [ {key1: value1}, {key2:value2}
    // const query2 = { $not: [{"rated":"R"} , {"year":"2010"}]};
    const query4 = { "genres": "Drama" };

    // set is blank for now
    const options4 = {
      projection: { _id: 0, title: 1, imdb: 1, year: 1 },
    };

    // Execute query
    const cursor4 = movies.find(query4, options4);

    // Print a message if no documents were found
    if ((await movies.countDocuments(query4)) === 0) {
      console.log("No documents found!");
    }

    // Print returned documents
    const countNumber4 = await movies.countDocuments(query4, options4);
    console.log("Number of movies " + countNumber4);

    console.log("----------------------------------------------------------------------");

    // 1. find - SELECT year, COUNT(*) FROM TABLE group by year

    const query5 = {};

    // set is blank for now
    const options5 = {    };

    const cursor5 = await database.collection('movies').aggregate([
      { $group: { _id: "$year", "Movies per year": { $sum: 1 } } }      
    ])

    // Print returned documents
    for await (const document_data5 of cursor5) {
      console.log(document_data5);
    }


  
    
    console.log("----------------------------------------------------------------------");

    // 1. find - SELECT year, COUNT(*) FROM TABLE WHERE countries = "Canada" group by year ORDER BY year asc
    const query7 = {};

    // set is blank for now
    const options7 = {    };

    const cursor7 = await database.collection('movies').aggregate([
      {
        $match: { countries: "Canada" }
      },
      { $group: { _id: "$year", "Movies count in year for Canada": { $sum: 1 } } } ,
      { 
        $sort: { _id: 1 } /* sort by year */
      }
    ])

    // Print returned documents
    for await (const document_data7 of cursor7) {
      console.log(document_data7);
    }

  } finally {
    await client.close();
  }
}
run().catch(console.dir);
