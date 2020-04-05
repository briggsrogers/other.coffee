import React from 'react';
import './Card.scss';

import location from '../../../assets/images/icon-location@2x.png';

import Button from '../../../component/Button';

class Card extends React.Component {  

  componentDidUpdate(prevProps, prevState) {

  }
  
  render(){

    let { Name, PlaceName, ShopUrl, Notes, Website } = this.props.data.fields;
    let { distanceFromUser } = this.props.data;

    return (
      <div className="CardContainer">
        <div className="Card">
          {/* <MapBoxStatic latitude={Latitude} longitude={Longitude}/> */}
          <div className="Title">{ Name }</div>

          <div className="LocationBar">
            <div className="Location">
              <img src={location} alt=""/>
              <span>{ PlaceName }</span>
            </div>
            {
              distanceFromUser ? (
                <div className="Distance">
                  <span>{ distanceFromUser } km away</span>
                </div>
              ) : null
            }
            
          </div>
          
          
          <p>{ Notes }</p>

          <div className="ButtonContainer">

           
            {
              Website ? (
                <Button type={"secondary"} cta="visit website" href={ Website }/>
              ) : null
            }
            {
              ShopUrl ? (
                <Button type={"primary"} cta="gift cards" href={ ShopUrl }/>
              ) : null
            }
            
          </div>
        </div>
      </div>
    );
  }
  
}

export default Card;
