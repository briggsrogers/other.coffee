import React from 'react';
import './ButtonWithHint.scss';

class ButtonWithHint extends React.Component {
  
  render(){
    return (
      <div className="ButtonWithHintContainer">
        <span className="Hint">{this.props.hint}</span>
        <button data-type={this.props.type} onClick={ () => { window.open( `${this.props.href}`, '_blank') } }>
          <span>{this.props.cta}</span>
        </button>
      </div>

    );
  }
    
}

export default ButtonWithHint;
