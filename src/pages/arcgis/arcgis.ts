import Collection from 'esri/core/Collection';
import { EsriLoaderService } from 'angular-esri-loader';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
    selector: 'arcgis-page',
    templateUrl: 'arcgis.html',
    styles: ['arcgis.scss']
})
export class ArcgisPage implements OnInit {

    constructor(private esriLoader: EsriLoaderService, private geolocation: Geolocation) { }

    private map: any;
    private MapPoint;
    @ViewChild('map') mapEl: ElementRef;

    ngOnInit() {
        this.esriLoader.load({
            url: 'https://js.arcgis.com/3.22'
        }).then(() => {
            this.geolocation.getCurrentPosition().then(res => {
                this.esriLoader.loadModules(['esri/map']).then(([Map]) => {
                    // create the map at the DOM element in this component
                    

                    this.map = new Map(this.mapEl.nativeElement, {
                        center: [res.coords.longitude, res.coords.latitude],
                        zoom: 18,
                        basemap: "streets"
                    });

                    // Shut off geolocation when user zooms.
                    this.map.on("zoom-end", function () {
                        // navigator.geolocation.clearWatch(watchId);
                        console.log("Geolocation stopped.");
                    });

                });
            });
        });
    }

    centerMap(lat, lon) {
        if (this.map != null) {
            console.log("Centering map: " + lat + ", " + lon);
            this.map.centerAt(this.MapPoint(lon, lat));
        }
    }
}
