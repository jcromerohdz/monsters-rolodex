import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';

import './App.css';

import { setSearchField } from './actions/';

//Greate React Developers Do
//1. Decide on Components
//2. Decide the State and where it lives
//3. What changes when state changes

const mapStateToProps = state => {
  return {
    searchField: state.searchField
  }
}

const mapDispatchToProps = (dispach) => {
  return {
    onSearchChange: (event) => dispach(setSearchField(event.target.value))
  }
}

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      // searchField: ''
    };

  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({ monsters: users }))

  }

  // handleChange = (e) => {
  //   this.setState({ searchField: e.target.value })
  // }


  render() {
    //const { monsters, searchField } = this.state;
    const { monsters } = this.state;
    const { searchField, onSearchChange } = this.props;
    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    )
    return (
      <div className="App">
        <h1>Monster Rolodex</h1>
        <SearchBox
          placeholder='search monster'
          handleChange={onSearchChange}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
