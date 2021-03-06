const express = require('express');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

const app = express();
let additionalCard = {"id":2  ,"front":"test front local","back":"test back local","categories":{"categories": 0, "second category": 1, "third": 1},"designations":["Paradigms"]};

let additionalCard2 = {"id":1,"front":"test front local Two","back":"test back local Two","categories":{"categories": 0, "second category": 1, "third": 1},"designations":["Form and Function"]};

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(express.json());

app.get('/db', async (req, res) => {
  console.log(process.env.environment);
  if(process.env.ENVIRONMENT == 'DEVELOPMENT'){
    res.json({"results":[{card:JSON.stringify(additionalCard)}, {card:JSON.stringify(additionalCard2)}]});
  } else {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM cardsjson');
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
  console.log(req.body);
  if(process.env.ENVIRONMENT == 'DEVELOPMENT'){
    additionalCard = req.body.card;
    res.status(200).send();
  } else {
    console.log('Getting into the else');
    let card = req.body.card;
    console.log(typeof(card))
    try {
      // pool.query('INSERT INTO cards (front, back, categories, designations) VALUES ('+card['front'] + ',' +card['back']+ ',' +card['categories']+ ',' +card['designations']+ ')').catch((err) => {
      //   console.log('error was');
      //   console.log(err);
      // });
      // pool.query('INSERT INTO cardsjson (id, card) VALUES (generate_uuid_v4(), \"'+json.stringify(card)+ '\")').catch((err) => {
      //   console.log('error was');
      //   console.log(err);
      // });
      pool.query('INSERT INTO cardsjson (card) VALUES ( \''+JSON.stringify(card)+'\')').catch((err) => {
        console.log('error was');
        console.log(err);
      });
      res.status(200).send();
    } catch(err){
      console.log('catching error in catch statement.')
      console.log(error);
      res.status(200).send(error);
    }
  }
});

app.post('/updateCard', async (req, res) => {
  console.log('Called update card with');
  console.log(req.body.card);
  if(process.env.ENVIRONMENT == 'DEVELOPMENT'){
    additionalCard = req.body.card;
    console.log(req.body.card);
    res.status(200).send();
  } else {
    console.log('Getting into the else');
    let card = req.body.card;
    try {
      pool.query('UPDATE cardsjson SET card =\''+JSON.stringify(card)+'\' WHERE id = \''+card['id']+'\'').catch((err) => {
        console.log('error was');
        console.log(err);
      });
      res.status(200).send();
    } catch(err){
      console.log('catching error in catch statement.')
      console.log(error);
      res.status(200).send(error);
    }
  }
});


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Cards listening on ${port}`);
