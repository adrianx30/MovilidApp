import { EsriLoaderService } from 'angular-esri-loader';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
    selector: 'arcgis-page',
    templateUrl: 'arcgis.html',
    styles: ['arcgis.scss']
})
export class ArcgisPage implements OnInit {
    private map: any;
    private MapPoint;
    routeSymbols: any;
    @ViewChild('map') mapEl: ElementRef;
    private addStops: Function;
    private addStop: Function;
    private calculateRoutes: Function;
    private showRoute: Function;
    private routeIndex = 'Route 1';
    private routeParams: any;
    private routeTask: any;

    constructor(private esriLoader: EsriLoaderService, private geolocation: Geolocation) { }

    ngOnInit() {
        this.esriLoader.load({
            url: 'https://js.arcgis.com/3.22'
        }).then(() => {
            this.geolocation.getCurrentPosition().then(res => {
                this.esriLoader.loadModules([
                    'esri/urlUtils',
                    'esri/config',
                    'esri/map',
                    'esri/graphic',
                    'esri/tasks/RouteTask',
                    'esri/tasks/RouteParameters',
                    'esri/tasks/FeatureSet',
                    'esri/symbols/SimpleMarkerSymbol',
                    'esri/symbols/SimpleLineSymbol',
                    'esri/Color',
                    'dijit/registry',
                    'dijit/layout/BorderContainer',
                    'dijit/layout/ContentPane',
                    'dijit/form/HorizontalSlider',
                    'dijit/form/HorizontalRuleLabels'
                ]).then(([urlUtils, esriConfig, Map, Graphic, RouteTask, RouteParameters,
                    FeatureSet, SimpleMarkerSymbol, SimpleLineSymbol,
                    Color, registry]) => {
                    // create the map at the DOM element in this component
                    this.map = new Map(this.mapEl.nativeElement, {
                        center: [res.coords.longitude, res.coords.latitude],
                        zoom: 15,
                        basemap: 'streets'
                    });

                    urlUtils.addProxyRule({
                        urlPrefix: "route.arcgis.com",
                        proxyUrl: "/sproxy/"
                    });

                    let routes = [];
                    this.routeTask = new RouteTask("https://utility.arcgis.com/usrsvcs/appservices/915rxshAzApr0Hrj/rest/services/World/Route/NAServer/Route_World/solve");
                    this.routeParams = new RouteParameters();
                    this.routeParams.stops = new FeatureSet();
                    this.routeParams.outSpatialReference = { "wkid": 102100 };
                    this.routeParams.returnDirections = true;
                    this.routeParams.directionsLanguage = 'es';

                    this.routeSymbols = {
                        "Route 1": new SimpleLineSymbol().setColor(new Color([0, 0, 255, 0.5])).setWidth(5),
                        "Route 2": new SimpleLineSymbol().setColor(new Color([0, 255, 0, 0.5])).setWidth(5),
                        "Route 3": new SimpleLineSymbol().setColor(new Color([255, 0, 255, 0.5])).setWidth(5)
                    };

                    let stopSymbol = new SimpleMarkerSymbol().setStyle(SimpleMarkerSymbol.STYLE_CROSS).setSize(15);
                    stopSymbol.outline.setWidth(3);

                    this.addStops = () => {
                        this.map.on('click', this.addStop);
                    };

                    this.addStop = (evt) => {
                        this.routeParams.stops.features.push(
                            this.map.graphics.add(
                                new Graphic(
                                    evt.mapPoint,
                                    stopSymbol,
                                    { RouteName: this.routeIndex }
                                )
                            )
                        );
                    };

                    this.showRoute = (result) => {
                        result.routeResults.forEach((routeResult, i) => {
                            routes.push(
                                this.map.graphics.add(
                                    routeResult.route.setSymbol(this.routeSymbols[routeResult.routeName])
                                )
                            );
                        });

                        var msgs = ["Server messages:"];
                        result.messages.forEach((message) => {
                            msgs.push(message.type + " : " + message.description);
                        });
                        if (msgs.length > 1) {
                            alert(msgs.join("\n - "));
                        }
                    }

                    this.calculateRoutes = () => {
                        this.routeTask.solve(this.routeParams).then(this.showRoute);
                    };

                    // Shut off geolocation when user zooms.
                    this.map.on('zoom-end', function () {
                        // navigator.geolocation.clearWatch(watchId);
                        console.log('Geolocation stopped.');
                    });

                });
            });
        });
    }

    centerMap(lat, lon) {
        if (this.map != null) {
            console.log('Centering map: ' + lat + ', ' + lon);
            this.map.centerAt(this.MapPoint(lon, lat));
        }
    }
}
