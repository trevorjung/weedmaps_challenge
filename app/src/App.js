import React, { Component } from 'react';
import FruitCard from './FruitCard.js';
import './App.css';

const formStyle = { marginTop: '5%' };
const warningStyle = { color: 'red', marginTop: '10%' };
const nameInput = {
  width: 250,
  margin: 10,
  height: 25,
  textAlign: 'center',
  borderRadius: '5%',
  fontSize: 14
}
const searchButtonStyle = {
  width: 94,
  height: 33,
  borderRadius: '10%',
  backgroundColor: 'green',
  color: 'white'
}

class App extends Component {
  state = {};

  async componentDidMount() {
    await fetch('fruits').then(res => res.json()).then(result => this.setState({ fruits: result }));
  }

  handleChange = (e) => {
    const dataLabel = e.target.placeholder;
    this.setState({ [dataLabel]: e.target.value })
  }

  searchFruits = async e => {
    try {
      this.setState({ error: '' });
      e.preventDefault();
      const { name } = this.state;
      const matchingFruits = await fetch(`/fruit?name=${name}`).then(res => res.json());
      if (matchingFruits.hasOwnProperty('error')) {
        this.setState({ error: matchingFruits.error, fruits: [] });
      } else {
        this.setState({ fruits: matchingFruits });
      }
    } catch(err) {
      console.log(err);
    }
  };

render() {
  const { error, fruits } = this.state;
    return (
      <div className="App">
          <p className="App-header">
            Welcome to The Fruit Directory
          </p>
          <form style={formStyle} onSubmit={this.searchFruits}>
            <p>
              <strong>Search for Fruits by Name</strong>
            </p>
            <input
              type="text"
              placeholder={'name'}
              onChange={this.handleChange}
              style={nameInput}
            />
            <button type="submit" style={searchButtonStyle}>Search</button>
          </form>
        {error && <strong><p style={warningStyle}>{error}</p></strong>}
        {fruits && fruits.map((fruit, index) => 
          <FruitCard key={index} fruit={fruit}/>
        )}
      </div>
    );
  }
}

export default App;