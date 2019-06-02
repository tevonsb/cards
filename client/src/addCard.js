import React, { Component } from 'react';

class AddCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      front: '',
      back: '',
      categories: '',
      designations: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addCard = this.addCard.bind(this);
  }

  async addCard(card){
    console.log('About to send request to addCard');
    await fetch('/addCard', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        card: card,
      })
    })
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    let card = {
      front: this.state.front,
      back: this.state.back,
      categories: this.state.categories.split(','),
      designations: this.state.designations.split(','),
    }
    this.addCard(card).then((res) => {
      this.props.updateCards();
      console.log('response from add card was');
      console.log(res)
    }).catch((err) => {
      console.log(err);
    });
    this.props.deactivate();
    event.preventDefault();
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
      <label>
      Front:
      <input type="text" value={this.state.value} onChange={(e) => this.setState({
        front: e.target.value
      })} />
      </label>
      <label>
      Back:
      <input type="text" value={this.state.value} onChange={(e) => this.setState({
        back: e.target.value
      })} />
      </label>
      <label>
      Categories:
      <input type="text" value={this.state.value} onChange={(e) => this.setState({
        categories: e.target.value
      })} />
      </label>
      <label>
      Designations:
      <input type="text" value={this.state.value} onChange={(e) => this.setState({
        designations: e.target.value
      })} />
      </label>
      <div>{this.state.value}</div>
      <input type="submit" value="Submit" />
      </form>
    );
  }

}
export default AddCard;
