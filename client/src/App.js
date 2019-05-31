import React, { Component } from 'react';

import './App.css';
import { cards } from './cards.js';
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});


const title = "Black and White Cards";


const description = ["The purpose of these cards is to jog the creative mindset. Sometimes we get stuck in the way we think about thing, the hope is that in considering something tangential, we get a different view of the problem at home. These were developed from interviews during the Stanford class Beyond Pink and Blue, and thus have a specific focus on gender in tech."]

async function loadCards() {
  console.log('loading cards...');
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM cards');
    const results = { 'results': (result) ? result.rows : null};
    console.log(results);
    console.log('NO ERRORS IN DB CONNECTION')
    client.release();
  } catch(err) {
    console.log('DB ERROR')
    console.log(err);
  }
}


class App extends Component {

  constructor(props){
    super(props);
    this.state ={
      cardsActive: false,
      counter: 0,
      card: cards[Math.floor(Math.random() * cards.length)],
    }
    this.selectCard = this.selectCard.bind(this);
  }

  componentDidMount(){
    loadCards();
  }

  selectCard(){
    const card = Math.floor(Math.random() * cards.length)
    this.setState({
      card: cards[card],
    });
    console.log('Cleckied')
  }

  renderCards(){
    return (<div className="CardContainer"
    >
    <div className="Card"
      onClick={() => this.setState({
        card: cards[Math.floor(Math.random() * cards.length)],
      })}
      >{this.state.card}</div>
  </div>)
}

getCard(){
  return description.map((item) => {
    return (<p key={item} className="Description">{item}</p>)
  });
}

render() {
  if(this.state.cardsActive){
    return (
      <div className="App">
        <div className="Container">
          {this.renderCards()}
        </div>
      </div>
    )
  }
  return (
    <div className="App">
      <div className="Container">
        <h1 className="Header"
          >
          {title}
        </h1>
        <div>
          {this.getCard()}
        </div>
        <div className="ButtonContainer">
          <button className="Button" onClick={() => this.setState({cardsActive: true,})}>The Cards</button>
        </div>
      </div>
    </div>
  );
}
}

export default App;
