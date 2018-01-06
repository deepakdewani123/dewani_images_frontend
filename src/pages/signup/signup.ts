import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ImageService } from "./../../app/services/image.service";
import { AlertController } from "ionic-angular";
import { ModalController } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { AlbumsPage } from "../albums/albums";
import { LoadingController } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-signup",
  templateUrl: "signup.html"
})
export class SignupPage {
  mobileNumber: string;

  loader = this.loadingCtrl.create({
    content: "Please wait...",
    spinner: "crescent"
  });
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private imageService: ImageService,
    private alertCtrl: AlertController,
    private storage: Storage,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController
  ) {
    this.mobileNumber = "";
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SignupPage");
  }

  signUserUp(number: string) {
    if (number === "") {
      this.showAlert("Please enter you mobile number");
    } else {
      this.loader.present();
      this.imageService.signUserUp(number).subscribe(
        response => {
          if (response.data.allowed) {
            this.storage.set("userID", response.data.user.userID);
            this.storage.set("userName", response.data.user.userName);
            this.loader.dismiss();
            let modal = this.modalCtrl.create(AlbumsPage);
            modal.present();
            // this.navCtrl.push(AlbumsPage);
          } else {
            this.showAlert("You're not allowed to access this application");
          }
        },
        error => {
          this.showAlert("There was an error signing you up.");
        }
      );
    }
  }

  showAlert(subTitle: string) {
    let alert = this.alertCtrl.create({
      title: "Oops!",
      subTitle: subTitle,
      buttons: ["OK"]
    });
    alert.present();
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      spinner: "crescent"
    });
    loader.present();
  }
}
