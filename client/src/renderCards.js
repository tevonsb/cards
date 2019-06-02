import React, { Component } from 'react';


class RenderCards extends Component {
  constructor(props){
    super(props);
    this.state = {
      card: this.props.cards[Math.floor(Math.random() * this.props.cards.length)],
      active: 'front'
    }
    this.selectCard = this.selectCard.bind(this);
    this.nextCard = this.nextCard.bind(this);
    console.log(this.props.cards);
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
    
  }

  render(){
    return (
      <div>
      <div className="CardContainer">
      <div className="Card"
      onClick={this.selectCard}
      >{this.state.card[this.state.active]}
      </div>
      <div className="CategoriesContainer">
        {this.getCategories()}
      </div>
      </div>
      <button className="NextButton" onClick={this.nextCard}>Next Card</button>
      </div>
    )
  }
}

export default RenderCards;
