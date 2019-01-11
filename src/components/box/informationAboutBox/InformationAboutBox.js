import React, { Component } from 'react';
import {ContentInfo} from './contentInfo/ContentInfo'
import './InformationAboutBox.css'

/**
*
*component that contains the logic to show the information about the selected field
*@params: personToShow
**/
export class InformationAboutBox extends Component {
  constructor(props){
    super(props)
    this.state = {personToShow:this.props.personToShow}
  }

  componentWillUpdate(nextProps, nextState){
    nextState.personToShow =nextProps.personToShow
  }

  render(){
    return(
      <div className="basic-box information-about-box">
      <h2><b>Information About...</b></h2>
      {this.state.personToShow === null ?
        <div>Choose someone to get more information abot!</div>
        :
        <ContentInfo personObj={this.state.personToShow}/>
      }
      </div>
    )
  }
}
