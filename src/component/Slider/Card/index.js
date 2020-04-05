import React from 'react';
import './Card.scss';

import location from '../../../assets/images/icon-location@2x.png';

import Link from '../../Link';
import ButtonWithHint from '../../ButtonWithHint';

class Card extends React.Component {  
  
  render(){

    let { Name, PlaceName, ShopUrl, Notes, Website, IG } = this.props.data.fields;
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
          
          <div className="ButtonContainer">

            {
              ShopUrl ? (
                <ButtonWithHint hint={"support this business"} type={"primary"} cta="shop online" href={ ShopUrl }/>
              ) : null
            }
            
          </div>
          
          <div className="NotesContainer"><p>{ Notes }</p></div>
          

          {
            Website ? (
              <Link cta={Website} href={ Website }/>
            ) : null
          }
          {
            IG ? (
              <Link cta={`@${IG}`} href={ `https://instagram.com/${IG}` }/>
            ) : null
          }


        </div>
      </div>
    );
  }
  
}

export default Card;
