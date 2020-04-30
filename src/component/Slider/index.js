import React from "react";
import "./Slider.scss";

import { isMobile } from 'utils/platform-helpers';

import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

import Card from "./Card";

class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      detailViewActive: false
    }

    this.slider = null;

    //Binding
    this.toggleDetailView = this.toggleDetailView.bind(this);
  }

  toggleDetailView(){
    //Cancel on mobile
    if( !isMobile() ){ return }
    let {detailViewActive} = this.state;
    this.setState( { detailViewActive: !detailViewActive } )
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
    //this.slider.onTouchEnd = () => {console.log('Change')};
  }

  generateCards() {
    let { cards } = this.props;
    let { detailViewActive } = this.state;

    let deck = [];

    cards.forEach((item, i) => {
      deck.push(<div key={i}><Card data={item} expanded={detailViewActive} /></div>);
    });

    return deck;
  }

  render() {
    let cards;
    let {detailViewActive} = this.state;

    cards = this.generateCards();
    

    const onTransitionEnd = ({
      currentIndex
    }) => {
      let { onChange } = this.props;

      onChange(currentIndex);
    }

    return (
      <div className="SliderContainer" data-detail={detailViewActive} onClick={this.toggleDetailView}>

        {
          cards ? (
            <AwesomeSlider 
              bullets={false} 
              onTransitionEnd={onTransitionEnd} 
              selected={this.props.selectedIndex}
              infinite={false}
              organicArrows={false}
              arrows={true}
              fillParent={true}
              mobileTouch={!detailViewActive}>
                {cards}
            </AwesomeSlider>// default false>
          ) : null
        }
        
      </div>
    );
  }
}

export default Slider;
