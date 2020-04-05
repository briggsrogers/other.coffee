import React from 'react';
import './Link.scss';

class Link extends React.Component {
  
  render(){
    return (
      <div className="LinkContainer">
        <a href={this.props.href} target="_blank">{this.props.cta}</a>
      </div>
    );
  }
    
}

export default Link;
