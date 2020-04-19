import React from "react";
import "./App.scss";
// import Header from './component/Header';
import FilterView from "./component/FilterView";
import Slider from "./component/Slider";
import MapBox from "./component/MapBox";
import Spinner from "./component/Spinner";

import icon from "./assets/images/icon-filter@2x.png";

import { getEntries } from "./utils/data-helpers";
import { distanceBetween } from "./utils/location-helpers";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allEntries: [],
      relevantEntries: [],
      selectedEntry: {},
      userLocation: [53.339961, -6.24197], //Dublin
      menuActive: false,
      filtersApplied: false,
      isAwaitingData: true,
    };

    // Binding
    this.updateSelected = this.updateSelected.bind(this);
    this.requestLocation = this.requestLocation.bind(this);
    this.sortByNearby = this.sortByNearby.bind(this);
    this.setEntries = this.setEntries.bind(this);
    this.updateRelavent = this.updateRelavent.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleFilterApplied = this.toggleFilterApplied.bind(this);
  }

  componentDidMount() {
    let { latitude, longitude } = this.state.userLocation;

    getEntries((data) => {
      let entries = this.sortByNearby(data, latitude, longitude);
      this.setEntries(entries);

      // Locate User
      this.requestLocation();
    });
  }

  toggleMenu() {
    this.setState({ menuActive: !this.state.menuActive });
  }

  toggleFilterApplied(boolean) {
    this.setState({ filtersApplied: boolean });
  }

  setEntries(entries) {
    this.setState({
      allEntries: entries,
      relevantEntries: entries,
      selectedEntry: entries[0],
      selectedIndex: 0,
    });
  }

  updateSelected(index) {
    //After swipe
    let { relevantEntries } = this.state;
    this.setState({
      selectedEntry: relevantEntries[index],
      selectedIndex: index,
    });
  }

  updateRelavent(entries) {
    this.setState({
      relevantEntries: entries,
      selectedEntry: entries[0],
      selectedIndex: 0,
    });
  }

  requestLocation() {
    let { allEntries } = this.state;

    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
    } else {
      console.log("Locating…");
      navigator.geolocation.getCurrentPosition(
        (userLocation) => {
          let { latitude, longitude } = userLocation.coords;
          console.log("Located", latitude, longitude);

          // Set Location
          this.setState({
            userLocation: [latitude, longitude],
            isAwaitingData: false
          });

          let nearbyEntries = this.sortByNearby(
            allEntries,
            latitude,
            longitude
          );
          this.setEntries(nearbyEntries);
        },
        (error) => {
          console.log("Error", error);
          this.setState({
            isAwaitingData: false
          });
        }
      );
    }
  }

  sortByNearby(data) {
    const { userLocation } = this.state;

    let locatedEntries = [];

    data.forEach((item) => {
      const { Latitude, Longitude } = item.fields;
      // Add distance from user
      let distanceFromUser = distanceBetween(
        userLocation[0],
        userLocation[1],
        Latitude,
        Longitude,
        "K"
      );
      item.distanceFromUser = Math.round(distanceFromUser * 10) / 10
      locatedEntries.push(item);
    });

    let sortedEntries = locatedEntries.sort((a, b) => {
      return a.distanceFromUser - b.distanceFromUser;
    });

    return sortedEntries;
  }

  render() {
    let {
      allEntries,
      relevantEntries,
      selectedEntry,
      selectedIndex,
      menuActive,
      filtersApplied,
      isAwaitingData,
    } = this.state;

    return (
      <div className="App">
        {/* <Header /> */}
        <MapBox
          allEntries={relevantEntries}
          relevantEntries={relevantEntries}
          selectedEntry={selectedEntry}
          onMarkerClick={this.updateSelected}
        />

        <Slider
          cards={relevantEntries}
          onChange={this.updateSelected}
          selectedIndex={selectedIndex}
        />

        <FilterView
          onFilter={this.updateRelavent}
          toggleFilterApplied={this.toggleFilterApplied}
          allEntries={allEntries}
          active={menuActive}
        />

        <div
          className="MenuToggle"
          data-active={menuActive}
          onClick={this.toggleMenu}
          data-filtersapplied={filtersApplied}
        >
          {menuActive ? (
            <span className="ToggleInnerActive">{`${relevantEntries.length} places`}</span>
          ) : (
            <span className="ToggleInnerInActive">
              <img src={icon} alt="filter" />
              <span>Filters</span>
            </span>
          )}
        </div>

        {isAwaitingData ? (
          <div className="LoadingVeil">
            <Spinner />
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;
