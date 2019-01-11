import React, { Component } from 'react';
import './TextInput.css';

/**
*component that contains a text input
**/
export class TextInput extends Component {
  constructor(props){
    super(props)
    this.value = this.props.searchValue
  }

  render(){
    return(
      <input type="text" placeholder={this.props.placeholder} onChange={this._textChanges} value={this.value} onKeyPress={this._handleKeyPress}/>
    )
  }

  _handleKeyPress=(e)=>{
    if(e.key === 'Enter'){
      this.props.onForceSearch()
    }
  }

  _textChanges=(e)=>{
    this.value = e.target.value
    this.props.onResults(this.value)
  }
}
