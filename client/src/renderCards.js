import React, { Component } from 'react';
import _ from 'lodash';

class RenderCards extends Component {
  constructor(props){
    super(props);
    this.state = {
      card: this.props.cards[Math.floor(Math.random() * this.props.cards.length)],
      active: 'front'
    }
    if(this.props.cards.length === 0){
      this.state.card = {
        front: "There are no cards in this category yet. Add one?",
        back:"There are no cards in this category yet. Add one?",
        categories: [],
      };
    }
    this.selectCard = this.selectCard.bind(this);
    this.nextCard = this.nextCard.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
  }

  selectCard(){
    this.setState({
      active: this.state.active == 'front'? 'back': 'front',
    });
  }

  nextCard(){
    this.setState({
      card: this.props.cards[Math.floor(Math.random() * this.props.cards.length)],
    });
  }

  getCategories(){
    console.log('categories');
    console.log(this.state.card.categories);
    if(this.state.card.categories < 1){
      return;
    }
    return _.map(Object.keys(this.state.card.categories), (category) => {
      return (<button
        onClick={(e) => this.handleCategoryClick(e, category)}
        className="Category Button"
        key={category}>
        {category} {this.state.card.categories[category]}
      </button>);
    });
  }

  handleCategoryClick(e, category){
    e.stopPropagation()
    let card = this.state.card;
    card.categories[category] += 1;
    this.setState({
      card: card,
    });
    console.log('IN handleCategoryClick');
    console.log(card);
    fetch('/updateCard', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        card: card,
      })
    }).catch((err)=> {
      console.log('Error updating the database');
    });
  }

  render(){
    return (
      <div>
        <div className="CardContainer">
          <div className="Card"
            onClick={this.selectCard}
            >{this.state.card[this.state.active]}
            <div className="CategoriesContainer">
              {this.getCategories()}
            </div>
          </div>
          <div className="CategoriesContainer">
          </div>
        </div>
        <button className="NextButton Button" onClick={this.nextCard}>Next Card</button>
        <button className="BackButton Button" onClick={this.props.deactivate}>Back</button>
      </div>
    )
  }
}

export default RenderCards;
