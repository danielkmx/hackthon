import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import React, { Component } from 'react';
import LocationSearchInput from './AutoComplete';
import '../App.css';

export class MapContainer extends Component {
  state = { selectedPlace: { name: '' } };
  fetchPlaces(mapProps, map) {
    console.log(mapProps);
    const { google, initialCenter } = mapProps;
    const { lat, lng } = initialCenter;
    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch(
      {
        location: { lat, lng },
        radius: 5500,
        type: ['restaurant'],
      },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            //    console.log(results[i]);
          }
        }
      },
    );
  }
  fetchDirection = (props) => {
    console.log('------------FETCHING ROUTE----------');
    console.log(props);
    const { position, destination, google } = props;
    const { lat, lng } = position;
    const directionsService = new google.maps.DirectionsService();

    if (destination) {
      directionsService.route(
        {
          origin: { lat, lng },
          destination,
          travelMode: google.maps.TravelMode.DRIVING,
          waypoints: [],
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            console.log(result);
            this.setState({
              directions: result,
            });
            this.props.setShouldSearch(false);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        },
      );
    }
  };

  render() {
    console.log(this.props);
    const { google, position, shouldSearch } = this.props;
    const { lat, lng } = position;
    return (
      <div className="map-container">
        <LocationSearchInput
          handleInput={(value) => {
            this.props.setFirstTime(false);
            this.props.setPosition(value);
          }}
        />
        <div className="map">
          <Map
            visible={true}
            initialCenter={{
              lat,
              lng,
            }}
            google={google}
            zoom={14}
            onReady={this.fetchPlaces}
          >
            <Marker onClick={this.onMarkerClick} name={'Current location'} />

            <InfoWindow onClose={this.onInfoWindowClose}>
              <div>
                <h1>{this.state.selectedPlace.name}</h1>
              </div>
            </InfoWindow>
          </Map>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
})(MapContainer);
