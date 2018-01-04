import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ImageService } from "./../../app/services/image.service";
import { AlertController } from "ionic-angular";
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-signup",
  templateUrl: "signup.html"
})
export class SignupPage {
  mobileNumber: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public imageService: ImageService,
    public alertCtrl: AlertController
  ) {
    this.mobileNumber = "";
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SignupPage");
  }

  signUserUp(number: string) {
    // console.log(number);

    this.imageService.signUserUp(number).subscribe(
      response => {
        if (response.data.allowed) {
          if (!response.data.created) {
          } else {
            this.showAlert("You are already signed up!");
          }
        } else {
          this.showAlert("You're not allowed to access this application");
        }
      },
      error => {}
    );
  }

  showAlert(subTitle: string) {
    let alert = this.alertCtrl.create({
      title: "Oops!",
      subTitle: subTitle,
      buttons: ["OK"]
    });
    alert.present();
  }
}
