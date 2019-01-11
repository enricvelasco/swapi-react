import React, { Component } from 'react';
import {ContentPeopleSaved} from './contentPeopleSaved/ContentPeopleSaved'
import {GenderFilter} from '../../buttons/genderFilter/GenderFilter'

/**
*component that manages the list of records saved and filters by gender
**/
export class SavedPeopleBox extends Component {
  constructor(props){
    super(props)
    this.allList = this.props.savedPeopleList
    this.state={list:this.props.savedPeopleList, genderFilter:null}
  }

  componentWillUpdate(nextProps, nextState){
    if(nextState.genderFilter !== null){
      let list = nextProps.savedPeopleList.filter(item => item.gender === nextState.genderFilter);
      nextState.list =list
    }else{
      nextState.list =nextProps.savedPeopleList
    }

  }

  render(){
    return(
      <div className="basic-box">
      <h2><b>Saved People</b></h2>
      {this.state.list.length <= 0 ?
        <div>You didn't save any people yet!</div>
        :
        <div>
          <GenderFilter onFilterApply={this._setGenderFilter}/>
          <ContentPeopleSaved list={this.state.list} onRemove={this._removedList} onShowDetails={this._showDetails}/>
        </div>
      }
      </div>
    )
  }

  _checkGender=(item)=>{
    return item.gender = "male"
  }

  _setGenderFilter=(val)=>{
    this.setState({
      genderFilter:val
    })
  }

  _removedList=(list)=>{
    this.props.onRemove(list)
  }
  _showDetails=(person)=>{
    this.props.onShowValue(person)
  }
}
