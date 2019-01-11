import React, { Component } from 'react';
import "./StandardButton.css"

/**
*component that assembles a button with an answer
**/
export class StandardButton extends Component {
  constructor(props){
    super(props)
    this.state = {
      value:this.props.value,
      buttonName:this.props.buttonName
    }
  }

  componentWillUpdate(nextProps, nextState){
    nextState.value = nextProps.value
    nextState.buttonName = nextProps.buttonName
  }

  render(){
    return(
      <button className="standard-button" onClick={((e) => this._actionButton(e))}>{this.state.buttonName}</button>
    )
  }

  _actionButton=(e)=>{
    this.props.onButtonAction(e, this.state.value)
  }
}
