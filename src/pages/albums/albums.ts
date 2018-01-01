import { Album } from "./../../app/model/album.model";
import { ImageService } from "./../../app/services/image.service";
import { ImagesPage } from "./../images/images";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-albums",
  templateUrl: "albums.html"
})
export class AlbumsPage {
  albums: Album[];
  // items: string[] = [];
  // titles: string[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public imageService: ImageService
  ) {
    // this.items = ['../../assets/imgs/1.jpg', '../../assets/imgs/1.jpg', '../../assets/imgs/1.jpg', '../../assets/imgs/1.jpg'];
    // this.titles = ['Album-1', 'Album-2', 'Album-3', 'Album-4']
    // this.items = ['album-1', 'album-1', 'album-1', 'album-1', 'album-1']
    // this.albums = [
    //   { title: "Album-1", url: "../../assets/imgs/1.jpg" },
    //   { title: "Album-2", url: "../../assets/imgs/1.jpg" },
    //   { title: "Album-3", url: "../../assets/imgs/1.jpg" },
    //   { title: "Album-4", url: "../../assets/imgs/1.jpg" }
    // ];
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AlbumsPage");
    this.parseAlbums();
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter AlbumsPage");
  }

  parseAlbums() {
    this.albums = [];
    this.imageService.getAllAlbums().subscribe(
      response => {
        // console.log(response.data);
        for (let res of response.data) {
          const name = res.name;
          const coverImageUrl = res.coverImageURL;
          const coverTitle = res.coverTitle;

          let album: Album;
          album = new Album({
            name: name,
            coverImageURL: coverImageUrl,
            coverTitle: coverTitle
          });

          this.albums.push(album);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  itemSelected(item: any) {
    console.log(item.name);
    this.navCtrl.push(ImagesPage, {
      item: item.name
    });
  }
}
