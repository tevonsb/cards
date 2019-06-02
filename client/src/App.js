import React, { Component } from 'react';

import './App.css';
import { cards } from './cards.js';
import AddCard from './addCard.js';
import RenderCards from './renderCards';
import _ from 'lodash';

const title = "Black and White Cards";


const description = ["The purpose of these cards is to jog the creative mindset. Sometimes we get stuck in the way we think about things. The hope is that in considering something tangential, we get a different view of the problem at home. These cards were developed from interviews during the Stanford class Beyond Pink and Blue, and thus have a specific focus on gender in tech."]

async function loadCards() {
  console.log('loading cards...');
  // Get the passwords and store them in state
  return fetch('/db')
  .then(res => {
    return res.json();
  }).then((toReturn) => {
    console.log(toReturn);
    let cards = _.map(toReturn['results'], (card) => {
      let toReturn = JSON.parse(card['card']);
      toReturn.id = card['id'];
      return toReturn;
    });
    console.log('The returned cards are');
    console.log(cards);
    return cards;
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
      selectedDesignation: "All",
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
        <div className="App">
        <AddCard
          deactivate={() => {this.setState({addCardActive: false})}}
          updateCards={() => {
            loadCards().then((result) => {
              this.setState({
                cards: result,
              })
            })
          }}></AddCard>
      </div>
      );
    }
    if(this.state.cardsActive){
      let cards = _.filter(this.state.cards, (card) => {
        return _.includes(card.designations, this.state.selectedDesignation);
      });
      if(this.state.selectedDesignation === "All"){
        cards = this.state.cards;
      }
      return (
        <div className="App">
          <button className="Button" onClick={()=> this.setState({addCardActive: true})}>Add Card</button>
          <div className="Container">
            <RenderCards cards={cards} goBack={()=> this.setState({cardsActive: false, selectedDesignation: "All"})}></RenderCards>
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
            <button className="Button" onClick={() => this.setState({cardsActive: true,selectedDesignation: "All"})}>All Cards</button>
            <button className="Button" onClick={() => this.setState({cardsActive: true,selectedDesignation: "Form and Function"})}>Form and Function</button>
            <button className="Button" onClick={() => this.setState({cardsActive: true,selectedDesignation: "Experiences"})}>Experiences</button>
            <button className="Button" onClick={() => this.setState({cardsActive: true,selectedDesignation: "Systems"})}>Systems</button>
            <button className="Button" onClick={() => this.setState({cardsActive: true,selectedDesignation: "Paradigms"})}>Paradigms</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
