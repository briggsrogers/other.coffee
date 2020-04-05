import React from "react";
import "./Slider.scss";

//import Siema from "siema";

import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

import Card from "./Card";

class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.slider = null;
  }

  componentDidUpdate(prevProps, prevState) {
    // If this is a new deck, re-init slider
    if (this.props.cards.length !== prevProps.cards.length) {

    }

    // If new index
    if (this.props.selectedIndex !== prevProps.selectedIndex) {
      //this.siema.goTo(this.props.selectedIndex);
    }
  }

  componentDidMount() {
    console.log("Slider Mount", this.slider);
    //this.slider.onTouchEnd = () => {console.log('Change')};
    
  }

  generateCards() {
    let { cards } = this.props;

    let deck = [];

    cards.forEach((item, i) => {
      deck.push(<div key={i}><Card data={item} /></div>);
    });

    return deck;
  }

  render() {
    let cards;
    cards = this.generateCards();
    

    const onTransitionEnd = ({
      currentIndex
    }) => {
      let { onChange } = this.props;
      onChange(currentIndex);
    }

    return (
      <div className="SliderContainer">

        {
          cards ? (
            <AwesomeSlider 
              bullets={false} 
              onTransitionEnd={onTransitionEnd} 
              selected={this.props.selectedIndex}
              infinite={false}
              organicArrows={false}
              fillParent={false}>
                {cards}
            </AwesomeSlider>// default false>
          ) : null
        }
        
      </div>
    );
  }
}

export default Slider;
