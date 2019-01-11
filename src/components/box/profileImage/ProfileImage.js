import React, { Component } from 'react';
import {ImageView} from '../../forms/imageView/ImageView'
import './ProfileImage.css'

/**
*component that shows an image and the name of a record
*@params: name, url
**/
export class ProfileImage extends Component {
  constructor(props){
    super(props)
    this.state={
      name:this.props.name,
      url:this.props.url
    }
  }

  componentWillUpdate(nextProps, nextState){
    nextState.name = nextProps.name
    nextState.url = nextProps.url
  }

  render(){
    return(
      <div>
        <ImageView url={this.state.url}/>
        <h2><b className="profile-name">{this.state.name}</b></h2>
      </div>
    )
  }
}
