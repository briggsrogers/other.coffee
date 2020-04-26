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

    //Binding
    this.onSave = this.onSave.bind(this);

    console.log("isFav?", isFavourite(this.props.data.id));
  }

  handleDrag() {
    console.log("Drag");
  }

  onSave(e) {
    let { id } = this.props.data;
    console.log("Saving", this.props.data.id);
    toggleFavourite(id);
  }

  render() {
    let {
      Name,
      PlaceName,
      ShopUrl,
      Notes,
      Website,
      IG,
    } = this.props.data.fields;
    let { distanceFromUser } = this.props.data;
    let { expanded } = this.props;

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
            </div>
            {distanceFromUser !== null ? (
              <div className="Distance">
                <span>{distanceFromUser} km away</span>
              </div>
            ) : null}
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

          {!isMobile() || expanded ? (
            <div className="BottomContent">
              {Website ? <Link cta={Website} href={Website} /> : null}
              {IG ? (
                <Link cta={`@${IG}`} href={`https://instagram.com/${IG}`} />
              ) : null}
            </div>
          ) : null}

          <div className="Save" data-fav={isFavourite(this.props.data.id)}>
            <button onClick={(e) => this.onSave(e)}></button>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
