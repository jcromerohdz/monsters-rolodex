import React, { Component } from 'react';
import { CardList } from './components/card-list/card-list.component';
import './App.css';

//Greate React Developers Do
//1. Decide on Components
//2. Decide the State and where it lives
//3. Whate changes when state changes

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: ''
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({ monsters: users }))

  }
  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    )
    return (
      <div className="App">
        <input type='search' placeholder='search monster'
          onChange={e => this.setState({ searchField: e.target.value })} />
        <CardList monsters={filteredMonsters} />
      </div>
    )
  }
}

export default App;
