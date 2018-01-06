import { Storage } from "@ionic/storage";
import { ImageService } from "./../../app/services/image.service";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Image } from "../../app/model/image.model";

@IonicPage()
@Component({
  selector: "page-images",
  templateUrl: "images.html"
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
    private storage: Storage
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
          let isLiked = false;

          if (users.includes("deepakdewani")) {
            isLiked = true;
          } else {
            isLiked = false;
          }

          let image: Image;

          image = new Image({
            id: id,
            name: name,
            url: imageUrl,
            likeCount: likeCount,
            isLiked: isLiked,
            albumName: albumName,
            loaded: loaded
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
}
