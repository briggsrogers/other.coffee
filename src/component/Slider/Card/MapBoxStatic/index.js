import React from 'react';
import './MapBoxStatic.scss';

class MapBoxStatic extends React.Component {
  constructor(props) {
    super(props)

    this.generateUrl = this.generateUrl.bind(this);
  }
  
  generateUrl(){
    let { latitude, longitude } = this.props;
    return `https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/${longitude},${latitude},13,60/280x170@2x?access_token=pk.eyJ1Ijoicm9nYnJpYW4iLCJhIjoiY2s2OWg5c2U1MDJ0aDNncnp4bTdjZXF2MyJ9.Fj1bsimkrQtfHjmTROe-SQ`
  }
  
  render(){
    return (
      <div className="Container">
       <img src={ this.generateUrl() } alt=""/>
      </div>
    );
  }
}

export default MapBoxStatic;
