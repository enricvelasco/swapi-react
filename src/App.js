import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

import {BackgroundTitle} from './components/backgroundTitle/BackgroundTitle'
import {SearchPeopleBox} from './components/box/searchPeopleBox/SearchPeopleBox'
import {InformationAboutBox} from './components/box/informationAboutBox/InformationAboutBox'
import {SavedPeopleBox} from './components/box/savedPeopleBox/SavedPeopleBox'

class App extends Component {
  constructor(){
    super()
    this.state = {personToShow:null, savedPeople:[]}
  }

  render() {
    return (
      <div className="App">
        <BackgroundTitle message="Web test" messageType="0"/>
        <BackgroundTitle message="Play with SWAPI" messageType="1"/>
        <div className="content-box">
          <SearchPeopleBox savedPeopleList={this.state.savedPeople} onSaveValue={this._saveValuePerson} onShowValue={this._showValuePerson}/>
          <InformationAboutBox personToShow={this.state.personToShow}/>
        </div>
        <SavedPeopleBox savedPeopleList={this.state.savedPeople} onRemove={this._listRemoved} onShowValue={this._showValuePerson}/>
      </div>
    );
  }

  _listRemoved=(list)=>{
    this.setState({
      savedPeople: list
    })
  }

  _saveValuePerson=(person)=>{
    this.setState({
      savedPeople: [...this.state.savedPeople, person]
    })
  }

  _showValuePerson=(person)=>{
    this.setState({
      personToShow:person
    })
  }
}

export default App;
