import React from "react";
import "./App.scss";
import FilterView from "./component/FilterView";
import Slider from "./component/Slider";
import MapBox from "./component/MapBox";
import Spinner from "./component/Spinner";

import { getEntries } from "./utils/data-helpers";
import { distanceBetween } from "./utils/location-helpers";

import ReactGA from 'react-ga';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allEntries: [],
      relevantEntries: [],
      selectedEntry: {},
      userLocation: [53.339961, -6.24197], //Dublin
      filterViewActive: false,
      filtersApplied: false,
      isAwaitingData: true,
      haveResults: true
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

    // Track
    ReactGA.initialize('UA-165438248-1');
    ReactGA.pageview(window.location.pathname + window.location.search);

    getEntries((data) => {
      let entries = this.sortByNearby(data, latitude, longitude);
      this.setEntries(entries);

      // Locate User
      this.requestLocation();
    });
  }

  toggleMenu() {
    this.setState({ filterViewActive: !this.state.filterViewActive });

    // Track
    ReactGA.event({
      category: 'Interaction',
      action: 'Menu Toggle'
    });

  }

  toggleFilterApplied(boolean) {
    this.setState({ filtersApplied: boolean });

    // Track
    ReactGA.event({
      category: 'Interaction',
      action: 'Filter Toggle'
    });
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

    // Track
    ReactGA.event({
      category: 'Interaction',
      action: 'Card Swipe'
    });
  }

  updateRelavent(entries) {

    if(entries.length > 0){
      this.setState({
        relevantEntries: entries,
        selectedEntry: entries[0],
        selectedIndex: 0,
        haveResults: true
      });
    }
    else{
      this.setState({
        haveResults: false,
      })
    }
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
      filterViewActive,
      filtersApplied,
      isAwaitingData,
      haveResults
    } = this.state;

    let buttonString = relevantEntries.length > 1 ? `${relevantEntries.length} places` : `1 place`;
    if(!haveResults) { buttonString = 'No results :('}

    return (
      <div className="App">
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
          active={filterViewActive}
        />

        <div
          className="MenuToggle"
          data-active={filterViewActive}
          onClick={this.toggleMenu}
          data-filtersapplied={filtersApplied}
          data-disabled={!haveResults}
        >
          {filterViewActive ? (
            <span className="ToggleInnerActive">{`${buttonString}`}</span>
          ) : (
            <span className="ToggleInnerInActive">
              {/* <img src={icon} alt="filter" /> */}
              <span>Menu</span>
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
