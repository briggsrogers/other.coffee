import React from "react";
import "./MapBox.scss";
import "mapbox-gl/dist/mapbox-gl.css";

import mapboxgl from "mapbox-gl";

import { isFavourite } from '../../utils/fav-helpers';

class MapBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lng: 53.339961, //Dublin
      lat: -6.24197,
      zoom: 13,
      pitch: 40,
    };

    this.markers = [];

    mapboxgl.accessToken =
      "pk.eyJ1Ijoicm9nYnJpYW4iLCJhIjoiY2s2OWg5c2U1MDJ0aDNncnp4bTdjZXF2MyJ9.Fj1bsimkrQtfHjmTROe-SQ";

    this.initMapbox = this.initMapbox.bind(this);
    this.generateMarkers = this.generateMarkers.bind(this);
  }

  generateMarkers(items) {
    // Remove all
    this.markers.forEach((marker) => {
      marker.remove();
    });
    this.markers = [];

    let self = this;

    items.forEach((item, index) => {
      let { Longitude, Latitude, Name } = item.fields;
      
      // create a HTML element for each feature
      var el = document.createElement("div");
      el.addEventListener("click", () => {
        self.props.onMarkerClick(index);
      });

      let classList =
        item.id === this.props.selectedEntry.id ? "Marker Selected" : "Marker";
      el.className = classList;

      el.dataset.fav = isFavourite(item.id);
      el.dataset.isopen = (item.fields.CovidOpen === true);

      // create the popup
      let popup = new mapboxgl.Popup({ offset: 25 }).setText(Name);

      // make a marker for each feature and add to the map
      let marker = new mapboxgl.Marker(el)
        .setLngLat([Longitude, Latitude])
        .setPopup(popup);
      this.markers.push(marker);
    });

    this.markers.forEach((marker) => {
      marker.addTo(self.map);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    let { allEntries, relevantEntries, selectedEntry } = this.props;
    let { Longitude, Latitude } = selectedEntry.fields;

    if (prevProps.allEntries[0]) {
      if (allEntries[0].id !== prevProps.allEntries[0].id) {
        this.initMapbox();
      }
    }

    // If new selected entry
    if (selectedEntry.id !== prevProps.selectedEntry.id) {
      this.map.flyTo({
        center: [Longitude, Latitude],
        essential: true,
        curve: 0.5,
        speed: 1.5,
        zoom: 14
      });

      //Re-draw markers
      this.generateMarkers(relevantEntries);
    }

    if (relevantEntries.length !== prevProps.relevantEntries.length) {
      this.generateMarkers(relevantEntries);
    }
  }

  componentDidMount() {
    this.initMapbox();
  }

  initMapbox() {
    let { allEntries } = this.props;

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/rogbrian/ck9foarv20v3o1ik6jze2yepc",
      center: [this.state.lat, this.state.lng],
      zoom: this.state.zoom,
      pitch: this.state.pitch,
    });

    //Add User Location
    // Add geolocate control to the map.
    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );

    this.generateMarkers(allEntries);
  }

  render() {
    return (
      <div className="Container">
        <div
          className="MapBoxTarget"
          ref={(el) => (this.mapContainer = el)}
        ></div>
      </div>
    );
  }
}

export default MapBox;
