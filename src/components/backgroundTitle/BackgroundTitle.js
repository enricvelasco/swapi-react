import React, { Component } from 'react';
import './BackgroundTitle.css';

/**
*Basic component to indicate text types of the background screen
*
**/
export class BackgroundTitle extends Component {
  constructor(props){
    super(props)
    this.state={message:this.props.message,
                messageType:this.props.messageType
              }
  }

  render(){
    var messageRet
    switch (this.state.messageType) {
      case "0":
        messageRet = <div className="bck-text-title"><b>{this.state.message}</b></div>
      break;
      case "1":
        messageRet = <div className="bck-text-subtitle">{this.state.message}</div>
      break;
      default:
        messageRet = <div>default message</div>
    }

    return(
      <div>{messageRet}</div>
    )
  }
}
