import React, { Component } from 'react';

import './App.css';
import { cards } from './cards.js';
import AddCard from './addCard.js';
import RenderCards from './renderCards';

const title = "Black and White Cards";


const description = ["The purpose of these cards is to jog the creative mindset. Sometimes we get stuck in the way we think about thing, the hope is that in considering something tangential, we get a different view of the problem at home. These were developed from interviews during the Stanford class Beyond Pink and Blue, and thus have a specific focus on gender in tech."]

async function loadCards() {
  console.log('loading cards...');
  // Get the passwords and store them in state
  return fetch('/db')
  .then(res => {
    return res.json();
  }).then((toReturn) => {
    console.log(toReturn);
    return json.parse(toReturn['results']);
  });
}


class App extends Component {

  constructor(props){
    super(props);
    this.state ={
      cards: [],
      cardsActive: false,
      counter: 0,
      card: cards[Math.floor(Math.random() * cards.length)],
      addCardActive: false,
    }
    // this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    loadCards().then((result) => {
      console.log("RETURNING");
      console.log(result);
      this.setState({
        cards: result,
      })
    })
  }

  // handleClick(){
  //   console.log('Hanlde click');
  //   this.setState({
  //     addCardActive
  //   })
  // }

  getCard(){
    return description.map((item) => {
      return (<p key={item} className="Description">{item}</p>)
    });
  }

  render() {
    if(this.state.addCardActive){
      return (
        <AddCard
          deactivate={() => {this.setState({addCardActive: false})}}
          updateCards={() => {
            loadCards().then((result) => {
              console.log("RETURNING");
              console.log(result);
              this.setState({
                cards: result,
              })
            })
          }}></AddCard>
      );
    }
    if(this.state.cardsActive){
      return (
        <div className="App">
          <button className="Button" onClick={()=> this.setState({addCardActive: true})}>Add Card</button>
          <div className="Container">
            <RenderCards cards={this.state.cards}></RenderCards>
          </div>
        </div>
      )
    }
    return (
      <div className="App">
        <button className="Button"  onClick={() => this.setState({addCardActive: true})}>Add Card</button>
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
