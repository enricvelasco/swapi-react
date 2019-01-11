import React, { Component } from 'react';
import {TextInput} from '../textInput/TextInput'
import {StandardButton} from '../../buttons/standardButton/StandardButton'
import './Searcher.css';

/**
*component that is responsible for doing the search
**/
export class Searcher extends Component {
  constructor(props){
    super(props)
    this.state={
      searchValue:"",
      results:[]
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    //console.log("RECIVE PROPS -> searcher", nextProps);
  }

  render(){
    return(
      <div className="searcherInline">
        <TextInput onResults={this._textChangeValue} value={this.state.searchValue} placeholder="Search" onForceSearch={this._searchResults}/>
        <StandardButton buttonName="Search" onButtonAction={this._searchResults}/>
      </div>
    )
  }

  _textChangeValue=(value)=>{
    this.setState({
      searchValue:value
    })
  }

  _searchResults=(e, pUrlNext)=>{
    this.props.onLoadingStatus(true)
    let url = ""
    let isSinglePageResult = false
    if(pUrlNext === undefined){
      url = 'https://swapi.co/api/people/?search='+this.state.searchValue
      isSinglePageResult = true
      this.setState({
        results:[]
      })
    }else{
      url=pUrlNext
    }

    fetch(url)
    .then(
      (response)=>{
        if (response.status !== 200) {
            this.props.onSearchResults("error when retrieving data: "+response.status, true)
          return;
        }
        // Examine the text in the response
        response.json().then((data)=>{
          if(data.next !== null){
            this.setState({
              results:[...this.state.results, ...data.results]
            })
            this._searchResults(null, data.next)
          }else{
            if(isSinglePageResult){
              this.setState({
                results:data.results
              })
            }
            this.props.onSearchResults(this.state.results, false)
          }

        });
      }
    )
    .catch((err)=>{
      this.props.onSearchResults("Error",true)
    });
  }

}
