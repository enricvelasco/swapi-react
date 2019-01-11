import React, { Component } from 'react';
import {StandardButton} from '../standardButton/StandardButton'
import "./GenderFilter.css"

/**
*component that assembles 3 buttons for the types of gender
**/
export class GenderFilter extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  componentWillUpdate(nextProps, nextState){
  }

  render(){
    return(
      <div>
        <StandardButton buttonName="All" value={null} onButtonAction={this._buttonPressed}/>
        <StandardButton buttonName="Male" value="male" onButtonAction={this._buttonPressed}/>
        <StandardButton buttonName="Female" value="female" onButtonAction={this._buttonPressed}/>
      </div>

    )
  }

  _buttonPressed=(e, val)=>{
    this.props.onFilterApply(val)
  }
}
