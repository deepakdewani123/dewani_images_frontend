import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Storage } from "@ionic/storage";

// import { HomePage } from '../pages/home/home';
import { AlbumsPage } from "../pages/albums/albums";
import { SignupPage } from "../pages/signup/signup";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any = null;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    storage: Storage
  ) {
    platform.ready().then(() => {
      storage.get("userID").then(
        val => {
          // console.log(val);
          if (val) {
            console.log("value");
            this.rootPage = AlbumsPage;
          } else {
            console.log("no value");
            this.rootPage = SignupPage;
          }
        },
        err => {
          console.log(err);
        }
      );
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
