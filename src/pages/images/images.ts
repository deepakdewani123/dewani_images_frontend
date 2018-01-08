import { Storage } from "@ionic/storage";
import { ImageService } from "./../../app/services/image.service";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Image } from "../../app/model/image.model";
import { GalleryPage } from "./../gallery/gallery";
import { ModalController } from "ionic-angular";
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
  selector: "page-images",
  templateUrl: "images.html",
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
export class ImagesPage {
  albumTitle: string;
  albumName: string;
  images: Image[];
  loading: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public imageService: ImageService,
    private storage: Storage,
    private modalCtrl: ModalController
  ) {
    this.albumName =
      this.navParams.get("name") == null ? "" : this.navParams.get("name");
    this.albumTitle =
      this.navParams.get("title") == null ? "" : this.navParams.get("title");
    this.images = [];
    // this.images = ['../../assets/imgs/1.jpg', '../../assets/imgs/2.jpg', '../../assets/imgs/3.jpg']
    // this.images = ['https://s3-ap-southeast-1.amazonaws.com/kr-app-content/images/album-1/1.jpg', 'https://s3-ap-southeast-1.amazonaws.com/kr-app-content/images/album-2/2.jpg', 'https://s3-ap-southeast-1.amazonaws.com/kr-app-content/images/album-3/3.png']
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ImagesPage");
    // console.log(this.albumName);
    // this.images = [];
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter ImagesPage");
    // this.loading = true;
    // this.images = [];
    this.parseImages();
  }

  ionViewDidEnter() {}

  // loadDummyImages() {
  //   for (let i = 0; i < 5; i++) {
  //     const id = res.id;
  //     const imageName = res.imageName;
  //     const imageUrl = res.imageURL;
  //     const likes = res.likes;
  //     const albumName = res.albumName;
  //     const isLiked = false;

  //     let image: Image;
  //     image = new Image({
  //       id: id,
  //       name: name,
  //       url: imageUrl,
  //       likes: likes,
  //       isLiked: isLiked,
  //       albumName: albumName
  //     });

  //     this.images.push(image);
  //   }
  // }
  parseImages() {
    // console.log("parse");
    this.imageService.getImagesForAlbum(this.albumName).subscribe(
      response => {
        // console.log(response.data);
        for (let item of response.data.images) {
          const id = item.imageId;
          const imageName = item.imageName;
          const imageUrl = item.imageURL;
          const likeCount = item.likeCount;
          const albumName = item.albumName;
          const loaded = item.loaded;
          const users = item.likedByUsers;
          let state = "unlike";
          let isLiked = false;
          let visibility = "hidden";

          if (users.includes("deepakdewani")) {
            isLiked = true;
            state = "like";
            visibility = "shown";
          } else {
            isLiked = false;
            state = "unlike";
            visibility = "hidden";
          }

          let image: Image;

          image = new Image({
            id: id,
            name: name,
            url: imageUrl,
            likeCount: likeCount,
            isLiked: isLiked,
            albumName: albumName,
            loaded: loaded,
            state: state,
            visibility: visibility
          });
          this.images.push(image);
        }
        // this.loading = false;
      },
      error => {
        console.log(error);
      }
    );
  }

  likeImage(image: Image) {
    image.visibility = image.likeCount === 0 ? "hidden" : "shown";
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

  itemSelected(index: number) {
    // console.log(item.name);
    // this.navCtrl.push(GalleryPage, {
    //   images: this.images
    // });
    let modal = this.modalCtrl.create(GalleryPage, {
      images: this.images,
      index: index
    });
    modal.present();
  }
}
