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
    ]),
    trigger("visibility", [
      state(
        "shown",
        style({
          height: "10px"
        })
      ),
      state(
        "hidden",
        style({
          height: "0px"
        })
      ),
      transition("* => *", animate(".5s"))
    ])
  ]
})
export class GalleryPage {
  images: Image[];
  index: number;
  likeCount: number;
  isLiked: boolean;
  state: string;

  @ViewChild(Slides) slides: Slides;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public imageService: ImageService
  ) {
    this.images =
      this.navParams.get("images") == null ? [] : this.navParams.get("images");

    this.index =
      this.navParams.get("index") == 0 ? [] : this.navParams.get("index");

    this.state = "unlike";
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad GalleryPage");
  }

  ionViewWillEnter() {
    this.slides.slideTo(this.index, 0);
  }

  loadImages() {}

  slideChanged() {
    const currentIndex = this.slides.getActiveIndex();
    const image = this.images[currentIndex];
    this.likeCount = image.likeCount;
    this.isLiked = image.isLiked;

    // console.log("Current index is", currentIndex);
  }

  likeImage() {
    // image.visibility = image.likeCount === 0 ? "hidden" : "shown";
    let currentIndex = this.slides.getActiveIndex();
    const image = this.images[currentIndex];
    this.isLiked = image.isLiked;
    // this.state = image.state;
    console.log(this.isLiked);
    this.state = image.state === "unlike" ? "like" : "unlike";
    image.state = this.state;

    let userName = "";
    this.storage.get("userName").then(
      val => {
        userName = val.toLowerCase().replace(/ +/g, "");
        let action = "";

        if (!this.isLiked) {
          this.isLiked = true;
          this.likeCount = image.likeCount + 1;
          image.isLiked = true;
          image.likeCount = this.likeCount;
          action = "like";
        } else {
          this.isLiked = false;
          this.likeCount = image.likeCount - 1;
          image.isLiked = false;
          image.likeCount = this.likeCount;
          action = "unlike";
        }

        this.imageService.likeImageForId(image.id, action, userName).subscribe(
          response => {
            console.log(response);

            image.likeCount = response.data.document.likeCount;
            this.likeCount = image.likeCount;
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

  dismiss() {
    this.navCtrl.pop();
  }
}
