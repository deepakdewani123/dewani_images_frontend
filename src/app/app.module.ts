import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { AlbumsPage } from '../pages/albums/albums';
import { ImagesPage } from './../pages/images/images';
import { ImagesPageModule } from '../pages/images/images.module';
import { AlbumsPageModule } from './../pages/albums/albums.module';

@NgModule({
  declarations: [
    MyApp,
    // AlbumsPage,
    // ImagesPage
  ],
  imports: [
    BrowserModule,
    AlbumsPageModule,
    ImagesPageModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AlbumsPage,
    ImagesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
