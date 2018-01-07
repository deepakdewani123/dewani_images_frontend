import { Storage } from "@ionic/storage";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Image } from "../../app/model/image.model";
import { ImageService } from "./../../app/services/image.service";
import { ViewChild } from "@angular/core";
import { Slides } from "ionic-angular";

import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from "@angular/animations";

@IonicPage()
@Component({
  selector: "page-gallery",
  templateUrl: "gallery.html",
  animations: [
    trigger("likeAnimation", [
      state(
        "like",
        style({
          transform: "scale(1)"
        })
      ),
      state(
        "unlike",
        style({
          transform: "scale(1)"
        })
      ),
      transition(
        "unlike => like",
        animate(
          "300ms ease-in",
          keyframes([
            style({ transform: "scale(1.0) rotate(-5deg)", offset: 0.0 }),
            style({ transform: "scale(1.2) rotate(-10deg)", offset: 0.1 }),
            style({ transform: "scale(1.3) rotate(-15deg)", offset: 0.2 }),
            style({ transform: "scale(1.4) rotate(-20deg)", offset: 0.3 }),
            style({ transform: "scale(1.4) rotate(-25deg)", offset: 0.4 }),
            style({ transform: "scale(1.5) rotate(-30deg)", offset: 0.5 }),
            style({ transform: "scale(1.4) rotate(-25deg)", offset: 0.6 }),
            style({ transform: "scale(1.3) rotate(-20deg)", offset: 0.7 }),
            style({ transform: "scale(1.2) rotate(-15deg)", offset: 0.8 }),
            style({ transform: "scale(1.1) rotate(-10deg)", offset: 0.9 }),
            style({ transform: "scale(1.0) rotate(0deg)", offset: 1.0 })
          ])
        )
      )
    ])
  ]
})
export class GalleryPage {
  images: Image[];
  @ViewChild(Slides) slides: Slides;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public imageService: ImageService
  ) {
    this.images =
      this.navParams.get("images") == null ? [] : this.navParams.get("images");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad GalleryPage");
  }

  loadImages() {}

  likeImage(image: Image) {
    // image.visibility = image.likeCount === 0 ? "hidden" : "shown";
    image.state = image.state === "unlike" ? "like" : "unlike";
    // this.state = this.state === "unlike" ? "like" : "unlike";

    let userName = "";
    this.storage.get("userName").then(
      val => {
        userName = val.toLowerCase().replace(/ +/g, "");
        // console.log(userName);
        let action = "";

        if (!image.isLiked) {
          image.isLiked = true;
          image.likeCount = image.likeCount + 1;
          action = "like";
        } else {
          image.isLiked = false;
          image.likeCount = image.likeCount - 1;
          action = "unlike";
        }

        this.imageService.likeImageForId(image.id, action, userName).subscribe(
          response => {
            console.log(response);
            image.likeCount = response.data.document.likeCount;
            // image.isLiked = response.data.document.isLiked;
          },
          error => {
            console.log(error);
          }
        );
      },
      err => {
        console.log(err);
      }
    );
  }
  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log("Current index is", currentIndex);
  }
  dismiss() {
    this.navCtrl.pop();
  }
}
