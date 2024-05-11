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

    console.log("This aggregation stage performs a left outer join to a collection in the same database.");

    /* SELECT *, <output array field>
          FROM collection
          WHERE <output array field> IN (
            SELECT *
            FROM <collection to join>
            WHERE <foreignField> = <collection.localField>
          );
    */

    const query8 = {};

    // set is blank for now
    const options8 = {};

    const cursor8 = await database.collection('movies').aggregate([
      { $lookup:
        {
          from: 'comments',
          localField: '_id',
          foreignField: 'movie_id',
          as: 'MovieDetails'
        }
      }
    ])

    
    // Print returned documents
    for await (const document_data8 of cursor8) {
      console.log(document_data8);
      console.log("- - - - - - -");
    }

    console.log("----------------------------------------------------------------------");

    // 1. find - SELECT year, SUM(awards.wins) FROM TABLE WHERE countries = "Spain" group by year ORDER BY year asc
    // movies > comments

    const query9 = {};

    // set is blank for now
    const options9 = {};

    const cursor9 = await database.collection('movies').aggregate([
      { $lookup:
        {
          from: 'comments',
          localField: '_id',
          foreignField: 'movie_id',
          as: 'MovieDetails'
        }
      }
    ])

    
    // Print returned documents
    for await (const document_data9 of cursor9) {
      console.log(document_data9);
      console.log("- - - - - - -");
    }


  } finally {
    await client.close();
  }
}
run().catch(console.dir);
