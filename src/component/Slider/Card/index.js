/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import "./Card.scss";

import location from "../../../assets/images/icon-location@2x.png";
import { isMobile } from "utils/platform-helpers";
import { toggleFavourite, isFavourite } from "utils/fav-helpers";

import Link from "../../Link";
import ButtonWithHint from "../../ButtonWithHint";

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFavourite: isFavourite(this.props.data.id)
    }

    //Binding
    this.onSave = this.onSave.bind(this);
  }

  handleDrag() {
    console.log("Drag");
  }

  onSave(e) {
    e.stopPropagation();
    let { id } = this.props.data;

    this.setState({
      isFavourite: toggleFavourite(id)
    })
  }

  render() {
    let {
      Name,
      PlaceName,
      ShopUrl,
      Notes,
      Website,
      IG,
      LocalStocklist,
      CovidOpen,
      Latitude,
      Longitude
    } = this.props.data.fields;
    let { distanceFromUser } = this.props.data;
    let { expanded } = this.props;
    let { isFavourite } = this.state;
    const directionsLink = `https://www.google.com/maps/dir/?api=1&destination=${Latitude}%2C${Longitude}&mode=bicycling`;

    return (
      <div className="CardContainer">
        <div className="Card" data-expanded={expanded}>
          <div className="TopLockup">
            <div className="Title">{Name}</div>

            {isMobile() ? (
              <div className="ToggleCard" data-expanded={expanded}></div>
            ) : null}
          </div>

          <div className="LocationBar">
            <div className="Location">
              <img src={location} alt="" />
              <span>{PlaceName}</span>
              {distanceFromUser !== null ? (
              <div className="Distance">
                <span><a href={directionsLink} target="_blank">{distanceFromUser} km away</a></span>
              </div>
            ) : null}
            </div>
            <div className="Status">
              <span>{CovidOpen === true ? 'Now Serving!' : 'Temporarily Closed'}</span>
            </div>
          </div>

          <div className="ButtonContainer">
            {ShopUrl ? (
              <ButtonWithHint
                hint={"Support this business"}
                type={"primary"}
                cta="Shop online"
                href={ShopUrl}
              />
            ) : null}
          </div>

          <div className="NotesContainer">
            <p>{Notes}</p>
          </div>
          
          {
            LocalStocklist ? (
              <div className="StocklistContainer">
                  Beans: {LocalStocklist.join(',')}
              </div>
            ) : null
          }
         
          {!isMobile() || expanded ? (
            <div className="BottomContent">
              {Website ? <Link cta={Website} href={Website} /> : null}
              {IG ? (
                <Link cta={`@${IG}`} href={`https://instagram.com/${IG}`} />
              ) : null}
            </div>
          ) : null}

          <div className="Save" data-fav={isFavourite}>
            <button onClick={(e) => this.onSave(e)}></button>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
