import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';

import { MovilidApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ArcgisPage } from '../pages/arcgis/arcgis';
import { EsriLoaderService } from 'angular-esri-loader';

@NgModule({
  declarations: [
    MovilidApp,
    HomePage,
    ArcgisPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MovilidApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MovilidApp,
    HomePage,
    ArcgisPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EsriLoaderService
  ]
})
export class AppModule {}
