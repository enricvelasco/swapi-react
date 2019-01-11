import React, { Component } from 'react';
//import {TextInput} from '../../forms/textInput/TextInput'
import {Searcher} from '../../forms/searcher/Searcher'
import {TableList} from '../../tableList/TableList'
import {Pagination} from '../../buttons/pagination/Pagination'

import './SearchPeopleBox.css'

/**
*object that contains the columns that will be displayed
**/
const columns = [
  {name:"Name", key:"name"},
  {name:"Gender", key:"gender"},
  {name:"Birth year", key:"birth_year"},
  {name:"Eye Color", key:"eye_color"}
]

/**
*component that manages the search engine, the result list and the page
*
**/
export class SearchPeopleBox extends Component {
  constructor(props){
    super(props)
    this.state = {
      showList:false,
      errorMessage:"waiting for a search",
      resultList:[],
      loading:false,
      savedPeopleList:this.props.savedPeopleList,
      lastItem:10
    }
  }

  componentWillUpdate(nextProps, nextState){
    nextState.savedPeopleList =nextProps.savedPeopleList
  }

  render(){
    return(
      <div className="basic-box search-people-box">
      <h2><b>Search People</b></h2>
      <Searcher onSearchResults={this._getResults} onLoadingStatus={this._loadingStatus}/>
      {this.state.loading ?
        <div>Loading...</div>
        :
        this._mountContent()
      }

      </div>
    )
  }

  /**
  *manages the results of the search
  *@params: result, error
  **/
  _getResults=(result, error)=>{
    this.setState({loading:false})
    if(error){
      this.setState({
        errorMessage:result,
        showList:false
      })
    }else{
      this._checkIfItSaved(result)
      /*this.setState({
        errorMessage:"",
        showList:true,
        resultList:result
      })*/
    }
  }

  /**
  *manages the deletion of records already saved
  *@params: list
  **/
  _checkIfItSaved=(list)=>{
    let filteredItems = list
    if(this.state.savedPeopleList.length !== 0){
      this.state.savedPeopleList.forEach(rem=>{
        let valueToRemove = rem
        filteredItems = filteredItems.filter(function(item) {
          return item.name !== valueToRemove.name
        })
      })
    }
    this.setState({
      errorMessage:"",
      showList:true,
      resultList:filteredItems
    })
  }

  /**
  *return a record to save
  *@params: value
  **/
  _savePerson=(value)=>{
    //add image to object
    let personWithImage = this._addImageToPersonObject(value)
    this.props.onSaveValue(personWithImage)
  }

  /**
  *return a record to show
  *@params: value
  **/
  _showDetailsPerson=(value)=>{
    //add image to object
    let personWithImage = this._addImageToPersonObject(value)
    this.props.onShowValue(personWithImage)
  }

  /**
  *the SWAPI does not return profile image, we assign the image to it from another api
  @params: person
  **/
  _addImageToPersonObject=(person)=>{
    let name = person.name.toLowerCase().replace("-","").split(" ")
    let url = 'http://facetheforce.today/'+name[0]
    person.imageUrl = url
    return person
  }

  /**
  *manages the load
  *@params: isLoading
  **/
  _loadingStatus=(isLoading)=>{
    isLoading ? this.setState({loading:true}) : this.setState({loading:false})
  }

  /**
  *change of page
  *@params: pageNum
  **/
  _changePage=(pageNum)=>{
    console.log("PAGE NUM", pageNum);
    this.setState({
      lastItem:pageNum*10
    })
  }

  /**
  *reset pagination
  **/
  _resetPagination=()=>{
    this.setState({
      lastItem:10
    })
  }

  /**
  *manages the content of the search and the page
  **/
  _mountContent=()=>{
    if(this.state.showList){
      return <div className="search-table-overflow">
            <TableList columns={columns} data={this.state.resultList} onSavePerson={this._savePerson} onShowDetailsPeson={this._showDetailsPerson} lastItemNum={this.state.lastItem} onUnmount={this._resetPagination}/>
            <Pagination listLenght={this.state.resultList.length} onPageSelected={this._changePage}/>
            </div>
    }else{
      return <div>{this.state.errorMessage}</div>
    }
  }
}
