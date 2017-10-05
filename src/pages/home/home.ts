import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {
  GoogleMap, GoogleMapsEvent, GoogleMaps, GoogleMapOptions, LatLng
} from '@ionic-native/google-maps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  map: GoogleMap;
  errorTest;
  mapElement: HTMLElement;
  constructor(private googleMaps: GoogleMaps, public platform: Platform, private geolocation: Geolocation) {
    platform.ready().then(() => {
      this.loadMap();
    });
  }

  loadMap() {
    if (!this.geolocation) return;
    this.mapElement = document.getElementById('map');
    this.geolocation.getCurrentPosition().then(res => {
      let mapOptions: GoogleMapOptions = {
        camera: {
          target: {
            lat: res.coords.latitude,
            lng: res.coords.longitude
          },
          zoom: 18,
          tilt: 30
        }
      };

      this.map = this.googleMaps.create(this.mapElement, mapOptions);


      // Wait the MAP_READY before using any methods.
      this.map.one(GoogleMapsEvent.MAP_READY)
        .then(() => {
          console.log('Map is ready!');
          // Now you can use all methods safely.
          this.map.addMarker({
            title: 'Ionic',
            icon: 'blue',
            animation: 'DROP',
            position: {
              lat: res.coords.latitude,
              lng: res.coords.longitude
            }
          })
            .then(marker => {
              marker.on(GoogleMapsEvent.MARKER_CLICK)
                .subscribe(() => {
                  alert('clicked');
                });
            });
        });
    }).catch((error) => {
      console.log('Error getting location', error.message);
    });
  }

}
