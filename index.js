const express = require('express');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/passwords', (req, res) => {
  const count = 2;

  // Return them as json
  res.json();

  console.log(`Sent ${count} cards`);
});

app.get('/db', async (req, res) => {
  console.log(process.env.environment);
    if(process.env.ENVIRONMENT == 'DEVELOPMENT'){
      res.json({"results":[{"id":null,"front":"test front","back":"test back","categories":["categories"],"designations":["designations"]}]});
    } else {
      try {
        const client = await pool.connect()
        const result = await client.query('SELECT * FROM cards');
        const results = { 'results': (result) ? result.rows : null};
        res.json(results);
        client.release();
      } catch (err) {
        console.error(err);
        res.send("Error " + err);
      }
    }
  })

  app.post('/addCard', async (req, res) => {
    console.log('Called adding card with');
    console.log(req);
  });


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Cards listening on ${port}`);
