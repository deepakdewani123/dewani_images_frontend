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
  albumName: string;
  images: Image[];
  loading: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public imageService: ImageService
  ) {
    this.albumName =
      this.navParams.get("item") == null ? "" : this.navParams.get("item");
    // this.images = ['../../assets/imgs/1.jpg', '../../assets/imgs/2.jpg', '../../assets/imgs/3.jpg']
    // this.images = ['https://s3-ap-southeast-1.amazonaws.com/kr-app-content/images/album-1/1.jpg', 'https://s3-ap-southeast-1.amazonaws.com/kr-app-content/images/album-2/2.jpg', 'https://s3-ap-southeast-1.amazonaws.com/kr-app-content/images/album-3/3.png']
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ImagesPage");
    // console.log(this.albumName);
  }

  ionViewWillEnter() {
    this.loading = true;
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
    this.images = [];
    this.imageService.getImagesForAlbum(this.albumName).subscribe(
      response => {
        // console.log(response.data);
        for (let res of response.data) {
          const id = res.id;
          const imageName = res.imageName;
          const imageUrl = res.imageURL;
          const likes = res.likes;
          const albumName = res.albumName;
          const isLiked = false;

          let image: Image;
          image = new Image({
            id: id,
            name: name,
            url: imageUrl,
            likes: likes,
            isLiked: isLiked,
            albumName: albumName
          });

          this.images.push(image);
        }
        this.loading = false;
      },
      error => {
        console.log(error);
      }
    );
  }

  likeImage(image: Image) {
    if (image.isLiked) {
      image.isLiked = false;
      image.likes = image.likes - 1;
    } else {
      image.isLiked = true;
      image.likes = image.likes + 1;
    }
  }
}
