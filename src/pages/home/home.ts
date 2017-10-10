import { Component, ViewChild, ElementRef } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
// import {
//   GoogleMap, GoogleMapsEvent, GoogleMaps, GoogleMapOptions, LatLng, GroundOverlay
// } from '@ionic-native/google-maps';
declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElementHTML: ElementRef;
  @ViewChild('indications') mapRef: ElementRef;
  map: any;
  mapLimited;
  mapElement: HTMLElement;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  tileSize;
// private googleMaps: GoogleMaps,
  constructor(public platform: Platform, private geolocation: Geolocation) {
    this.CoordMapType.prototype.maxZoom = 19;
      this.CoordMapType.prototype.name = 'Tile #s';
      this.CoordMapType.prototype.alt = 'Tile Coordinate Map Type';

      this.CoordMapType.prototype.getTile = function(coord, zoom, ownerDocument) {
        var div = ownerDocument.createElement('div');
        div.innerHTML = coord;
        div.style.width = this.tileSize.width + 'px';
        div.style.height = this.tileSize.height + 'px';
        div.style.fontSize = '10';
        div.style.borderStyle = 'solid';
        div.style.borderWidth = '1px';
        div.style.borderColor = '#AAAAAA';
        div.style.backgroundColor = '#E5E3DF';
        return div;
      };

    platform.ready().then(() => {
      this.loadMap();
    });
  }

  loadMap() {
    if (!this.geolocation) return;
    this.mapElement = document.getElementById('map');
       let mapOptions = {
          zoom: 15,
          mapTypeId: 'roadmap',
          // mapTypeId: 'coordinate',
          mapTypeControlOptions: {
            mapTypeIds: ['coordinate', 'roadmap']
          }
      };

       this.map = new google.maps.Map(this.mapElement, mapOptions);
        // this.map.setMapTypeId('coordinate', new this.CoordMapType(new google.maps.Size(256, 256))); // https://developers.google.com/maps/documentation/javascript/examples/maptype-base?hl=es-419
       this.startNavigating('Premium Plaza', 'ruta N', this.map);
      console.log('location fired!');
  }


   CoordMapType(tileSize) {
      this.tileSize = tileSize;
    }

   startNavigating(start, end, map){
    console.log(google);
        this.directionsDisplay.setPanel(this.mapRef.nativeElement);
        this.directionsDisplay.setMap(map);
        
        this.directionsService.route({
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode['DRIVING']
        }, (res, status) => {
 
            if(status == google.maps.DirectionsStatus.OK){
                this.directionsDisplay.setDirections(res);
            } else {
                console.warn(status);
            }
 
        });
 
    }
}









//  loadMapNew(){
//     if (!this.geolocation) return;
    
//     this.mapElement = document.getElementById('map');
//     this.geolocation.getCurrentPosition().then((position) => {
 
//       let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
//       let mapOptions = {
//         controls: {
//           myLocationButton: true
//         },
//         center: latLng,
//         zoom: 15,
//         // mapTypeId: google.maps.MapTypeId.ROADMAP,
//         mapTypeControl: false,
//         zoomControl: true,
//         streetViewControl: false,
//         mapTypeId: 'coordinate',
//         mapTypeControlOptions: {
//           mapTypeIds: ['coordinate', 'roadmap']
//         }
//       }
 
//       this.map = new google.maps.Map(this.mapElement, mapOptions);
//       this.map.setTrafficEnabled(true);
      
//       // this.map.setMapTypeId('coordinate',
//       //                    new CoordMapType(new google.maps.Size(256, 256)));
//       let current = {lat: 37.768, lng: -122.511};
//           this.startNavigating(current, 'ruta N', this.map);
//     }, (err) => {
//       console.log(err);
//     });
 
//   }



  // loadMap2() {
  //   if (!this.geolocation) return;
  //   this.mapElement = document.getElementById('map');
  //   // this.geolocation.getCurrentPosition().then(position => {
  //     // let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
   
  //      let mapOptions = {
  //         zoom: 15,
  //         mapTypeId: 'coordinate',
  //         mapTypeControlOptions: {
  //         mapTypeIds: ['coordinate', 'roadmap']
  //       }
  //       };
  //     // this.map = this.googleMaps.create(this.mapElementHTML.nativeElement, mapOptions);
  //     // this.directionsDisplay.setMap(this.map);
  //      this.map = new google.maps.Map(this.mapElement, mapOptions);
  //       this.map.setMapTypeId('coordinate', new this.CoordMapType(new google.maps.Size(256, 256)));
  //      this.startNavigating('Premium Plaza', 'ruta N', this.map);
  //     console.log('location fired!');
      
      // this.map.setTrafficEnabled(true);
      // this.map.getMyLocation({enableHighAccuracy: true}).then((result) => {
      //   console.log('location', result);
      // });
        
        // this.mapLimited = new GroundOverlay(this.map, {});
        // this.mapLimited.setBounds([latLng]);
        // this.startNavigating(latLng, 'ruta N', this.map);

      // Wait the MAP_READY before using any methods.
      // this.map.one(GoogleMapsEvent.MAP_READY)
      //   .then(() => {
      //     // let current = {
      //     //     lat: res.coords.latitude,
      //     //     lng: res.coords.longitude
      //     //   };
      //     console.log('Map is ready!');
      //     // Now you can use all methods safely.
      //   });
    // }).catch((error) => {
    //   console.log('Error getting location', error.message);
    // });
  // }
