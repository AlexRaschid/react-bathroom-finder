import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './App.css';
import {MyMap} from './components/MyMap.js';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentPos: {
        lat: 12,
        lng: 12,
      }
    }
  }

  componentDidMount(){
    this.findCoordinates();
  }

  findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);

        this.setState({ currentPos:{
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        } });
      },
      error => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    console.log(this.state);
  };




  render() {
    return (
      <div className="App">
        <MyMap></MyMap>
        
        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyCZ6cSChM_EVpFY_iYNeo_plSDBogPYoPY' }}
            defaultCenter={{lat: this.state.currentPos.lat, 
                            lng: this.state.currentPos.lng}}
            defaultZoom={10}
          ></GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default App;
