const express = require('express');
const router = express.Router();
const { MongoClient } = require("mongodb");
require('dotenv/config');

router.get('/movies', async (req, res) => {
  const client = new MongoClient(process.env.DB_URI);
  
  const run = async () => {
    try {
      await client.connect();
      const db = client.db("movie_db");
      const coll = db.collection("movies");
      const cursor = coll.find();

      const movies = [];
      await cursor.forEach(movie => movies.push(movie));

      res.status(200).json(movies);
    } 
    finally {
      await client.close();
    }
  }

  run()
  .catch(console.dir);
});

module.exports = router;