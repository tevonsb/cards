import React, { Component } from 'react';

class AddCard extends Component {
  constructor(props){
    super(props);
  }

  addCard(){
    let sentCard = "Test";
    fetch('/addCad', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        card: sentCard,
      })
    })
  }

  this.handleChange()

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
      <label>
      Name:
      <input type="text" value={this.state.value} onChange={(value) => this.setState({value: value})} />
      </label>
      <input type="submit" value="Submit" />
      </form>
    );
  }


}
