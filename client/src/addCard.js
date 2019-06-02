import React, { Component } from 'react';
import _ from 'lodash';
import OutlinedInput from '@material-ui/core/OutlinedInput';

class AddCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      front: '',
      back: '',
      categories: '',
      designations: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addCard = this.addCard.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
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
    });
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    let enumCategories = {};
    _.map(this.state.categories.split(','), (cat) => {
      enumCategories[cat] = 0;
    });
    let card = {
      front: this.state.front,
      back: this.state.back,
      categories: enumCategories,
      designations: this.state.designations,
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

  handleCheckBox(check){
    let designations = this.state.designations;
    designations.push(check);
    this.setState({
      designations: designations,
    });
  }

  render(){
    return (
      <div>
      <form className="Form" onSubmit={this.handleSubmit}>
        <label className="TextLabel">
          Front:
        </label>
        <textarea className="TextInput" label="Front of the card" type="text" value={this.state.front} onChange={(e) => this.setState({
            front: e.target.value
          })} />
          <label className="TextLabel">
            Back:
          </label>

          <textarea className="TextInput" type="text" value={this.state.back} onChange={(e) => this.setState({
              back: e.target.value
            })} />
            <label className="TextLabel">
              Categories:
            </label>

            <input className="TextInput" type="text" value={this.state.categories} onChange={(e) => this.setState({
                categories: e.target.value
              })} />
              <label className="TextLabel">
                Designations:
              </label>
                <div>{this.state.value}</div>
                <div className="ButtonContainer">
                  <span className="TextLabel">
                    Form and Function
                    <input className="Button" type="checkbox" onClick={() => this.handleCheckBox("Form and Function")}/>
                  </span>
                  <span className="TextLabel">
                    Experiences
                    <input className="Button" type="checkbox"onClick={() => this.handleCheckBox("Experiences")}/>
                  </span>
                  <span className="TextLabel">
                    Systems
                    <input className="Button" type="checkbox" onClick={() => this.handleCheckBox("Systems")}/>
                  </span>
                  <span className="TextLabel">
                    Paradigms
                    <input className="Button" type="checkbox" onClick={() => this.handleCheckBox("Paradigms")}/>
                  </span>
                  </div>
                  <div className="ButtonContainer">
                    <input className="Button" type="submit" value="Submit" />
                  </div>
                </form>
                <button className="BackButton Button" onClick={this.props.deactivate}>Back</button>
                </div>
              );
            }

          }
          export default AddCard;
