import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Image } from '../../app/model/image.model'
@IonicPage()
@Component({
  selector: 'page-images',
  templateUrl: 'images.html',
})
export class ImagesPage {

  albumName: string;
  images: Image[];
  loading: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.albumName = this.navParams.get('item') == null ? '' : this.navParams.get('item');
    // this.images = ['../../assets/imgs/1.jpg', '../../assets/imgs/2.jpg', '../../assets/imgs/3.jpg']
    // this.images = ['https://s3-ap-southeast-1.amazonaws.com/kr-app-content/images/album-1/1.jpg', 'https://s3-ap-southeast-1.amazonaws.com/kr-app-content/images/album-2/2.jpg', 'https://s3-ap-southeast-1.amazonaws.com/kr-app-content/images/album-3/3.png']
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImagesPage');
    // console.log(this.albumName);
  }

  ionViewWillEnter(){
    this.loading = true;
    this.loadDummyImages();

    setTimeout(() => {
      this.loadImages();
    }, 2000);
  }

  ionViewDidEnter(){

  }

  loadImages() {
    this.images = [
      new Image({id: '100', url: 'https://s3-ap-southeast-1.amazonaws.com/kr-app-content/images/album-1/1.jpg', likes: 0, isLikes: false}),
      new Image({id: '101', url: 'https://s3-ap-southeast-1.amazonaws.com/kr-app-content/images/album-2/2.jpg', likes: 0, isLikes: false}),
      new Image({id: '102', url: 'https://s3-ap-southeast-1.amazonaws.com/kr-app-content/images/album-3/3.png', likes: 0, isLikes: false})]

      this.loading = false;
  }

  loadDummyImages() {
    this.images = [
      new Image({id: '100', url: '', likes: 0, isLikes: false}),
      new Image({id: '101', url: '', likes: 0, isLikes: false}),
      new Image({id: '102', url: '', likes: 0, isLikes: false})]
  }
  likeImage(image: Image) {
    if (image.isLiked) {
      image.isLiked = false
      image.likes = image.likes - 1;
    } else {
      image.isLiked = true
      image.likes = image.likes + 1;
    }
  }

}
