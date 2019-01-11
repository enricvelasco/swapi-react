import React, { Component } from 'react';
import './ImageView.css'

/**
*component that assembles an image from a url
**/
export class ImageView extends Component {
  constructor(props){
    super(props)
    this.state = {url:this.props.url}
  }

  componentWillUpdate(nextProps, nextState){
    nextState.url = nextProps.url
  }

  render(){
    return(
      <img className="imageView" src={this.state.url} alt="demo"/>
    )
  }
}
