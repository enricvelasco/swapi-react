import React, { Component } from 'react';
import {StandardButton} from '../buttons/standardButton/StandardButton'
import './TableList.css';

/**
*component that manages the table of results and the page received
**/
export class TableList extends Component {
  constructor(props){
    super(props)
    this.lastItemNum = this.props.lastItemNum
    this.columns = this._setColumns(this.props.columns)
    this.data = this._setData(this.props.data)
  }

  componentWillUpdate(nextProps, nextState){
    this.lastItemNum = nextProps.lastItemNum
    this.columns = this._setColumns(nextProps.columns)
    this.data = this._setData(nextProps.data)
  }

  componentWillUnmount(){
    this.props.onUnmount()
  }

  render(){
    return(
      <table id="customers">
        <tbody>
          <tr>
            {this.columns}
          </tr>
          {this.data}
        </tbody>
      </table>
    )
  }

  _setColumns=(pCol)=>{
    let col = []
    pCol.forEach(item=>{
      col.push(<th key={item.key}>{item.name}</th>)
    })
    col.push(<th key="options">OPTIONS</th>)
    return col
  }

  _showSelectedDetails=(e, val)=>{
    this.props.onShowDetailsPeson(val)
  }

  _savePerson=(e, val)=>{
    this.props.onSavePerson(val)
  }

  _setData=(pData)=>{
    let rows = []

    let firstItem = this.lastItemNum - 10
    let dataLength = firstItem
    let dataFiltered = this._getDataByKey(firstItem, this.lastItemNum, pData)
    dataFiltered.forEach(reg=>{
      let row = []
      this.columns.forEach(item=>{
        let value = pData[dataLength]
        if(item.key === "options"){
          row.push(<td key="buttons">
                      <StandardButton value={reg} buttonName="Show details" onButtonAction={this._showSelectedDetails}/>
                      <StandardButton value={reg} buttonName="Save" onButtonAction={this._savePerson}/>
                  </td>)
        }else{
          row.push(<td key={value[item.key]}>{value[item.key]}</td>)
        }
      })
      rows.push(<tr key={dataLength}>{row}</tr>)
      dataLength ++
    })

    //Without pages ====================
    /*pData.forEach(reg=>{
      let row = []
      this.columns.forEach(item=>{
        let value = pData[dataLength]
        if(item.key === "options"){
          row.push(<td>
                      <StandardButton value={reg} buttonName="Show details" onButtonAction={this._showSelectedDetails}/>
                      <StandardButton value={reg} buttonName="Save" onButtonAction={this._savePerson}/>
                  </td>)
        }else{
          row.push(<td>{value[item.key]}</td>)
        }
      })

      rows.push(<tr>{row}</tr>)
      dataLength ++
    })*/
    //Without pages ====================
    //console.log("ROWS RETURN", rows);
    return rows
  }

  _getDataByKey=(first, last, data)=>{
    let arrFiltered = []
    for(let i=first; i<last; i++){
      if(data[i] !== undefined){
        arrFiltered.push(data[i])
      }

    }
    return arrFiltered
  }
}
