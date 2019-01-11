import React, { Component } from 'react';
import {StandardButton} from '../standardButton/StandardButton'
import "./Pagination.css"

/**
*component that manages the number of pages of a result
**/
export class Pagination extends Component {
  constructor(props){
    super(props)
    this.state = {
      listLenght:this.props.listLenght
    }
  }

  componentWillUpdate(nextProps, nextState){
    nextState.listLenght = nextProps.listLenght
    nextState.loading = true
    nextState.buttons = []
    this._getPagesNum()
  }

  render(){
    return(
      <div>
        {this._getButtons()}
      </div>

    )
  }

  _getButtons=()=>{
    let totalPages = this._getPagesNum()
    let arrButtons = []
    for(let i=1; i<=totalPages; i++){
      arrButtons.push(<StandardButton key={i} buttonName={i} value={i} onButtonAction={this._buttonPressed}/>)
    }

    return arrButtons
  }

  _getPagesNum=()=>{
    let pages = this.state.listLenght / 10
    if(pages >= 2 && this.state.listLenght % 10 !== 0){
      pages ++
    }
    return pages
  }

  _buttonPressed=(e, val)=>{
    this.props.onPageSelected(val)
  }
}
