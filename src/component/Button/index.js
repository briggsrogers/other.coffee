import React from 'react';
import './Button.scss';

class Button extends React.Component {
  
  render(){
    return (
      <button data-type={this.props.type} onClick={ () => { window.open( `${this.props.href}`, '_blank') } }>
        <span>{this.props.cta}</span>
      </button>
    );
  }
    
}

export default Button;
