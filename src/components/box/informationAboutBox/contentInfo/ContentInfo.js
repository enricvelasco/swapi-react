import React, { Component } from 'react';
import {ProfileImage} from '../../profileImage/ProfileImage'
import './ContentInfo.css'

/**
*
*object with the parameters that we want to show on the card
**/
const dataShow = [
  {name:"Height", key:"height"},
  {name:"Mass", key:"mass"},
  {name:"Hair Color", key:"hair_color"},
  {name:"Skin Color", key:"skin_color"},
  {name:"Eye Color", key:"eye_color"},
  {name:"Birth Year", key:"birth_year"},
  {name:"Gender", key:"gender"}
]

/**
*component that creates the card of the field received
*
**/
export class ContentInfo extends Component {
  constructor(props){
    super(props)
    this.state={personData:this.props.personObj}
    //this.imageUrl = "http://facetheforce.today/luke"
  }

  componentWillUpdate(nextProps, nextState){
    nextState.personData =nextProps.personObj
  }

  render(){
    return(
      <div className="content-info">
        <ProfileImage url={this.state.personData.imageUrl} name={this.state.personData.name}/>
        {this._showInfo()}
      </div>
    )
  }

  /**
  *go through the field and mount the indicated parameters
  *
  **/
  _showInfo=()=>{
    let infoList = []
    dataShow.forEach(val=>{
      infoList.push(<div className="content-data-row underscore-element">
                      <p><b>{val.name}:</b> {this.state.personData[val.key]}</p>
                    </div>)
    })
    return infoList
  }
}
