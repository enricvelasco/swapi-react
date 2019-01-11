import React, { Component } from 'react';
import {ProfileImage} from '../../profileImage/ProfileImage'
import {StandardButton} from '../../../buttons/standardButton/StandardButton'
import './ContentPeopleSaved.css'

/**
*component that manages the selected cards
**/
export class ContentPeopleSaved extends Component {
  constructor(props){
    super(props)
    this.state={list:this.props.list}
  }

  componentWillUpdate(nextProps, nextState){
    nextState.list =nextProps.list
  }

  render(){
    return(
      <div className="content-people-saved">
        {this._getListCards()}
      </div>
    )
  }

  /**
  *Remove the indicated value from a list
  *@params: event, item
  **/
  _removeItem=(e,item)=>{
    let valueToRemove = item
    let filteredItems = this.state.list.filter(function(item) {
      return item !== valueToRemove
    })
    this.props.onRemove(filteredItems)
  }

  _showSelectedDetails=(e,item)=>{
    this.props.onShowDetails(item)
  }

  /**
  *create the cards corresponding to each selection
  *
  **/
  _getListCards=()=>{
    let arrCards = []
    this.state.list.forEach((item)=>{
      arrCards.push(<div className="item-people-saved">
                      <ProfileImage url={item.imageUrl} name={item.name}/>
                      <div className="buttons-in-card-saved">
                        <StandardButton value={item} buttonName="Show details" onButtonAction={this._showSelectedDetails}/>
                        <StandardButton value={item} buttonName="Remove" onButtonAction={this._removeItem}/>
                      </div>
                    </div>)
    })
    return arrCards
  }
}
