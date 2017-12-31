import { ImagesPage } from './../images/images';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the AlbumsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-albums',
  templateUrl: 'albums.html',
})
export class AlbumsPage {

  items: string[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.items = ['album-1', 'album-2', 'album-3', 'album-1', 'album-2', 'album-3', 'album-1', 'album-2', 'album-3', 'album-1', 'album-2', 'album-3', 'album-1', 'album-2', 'album-3', 'album-1', 'album-2', 'album-3'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlbumsPage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter AlbumsPage');
  }



  itemSelected(item: string) {
    console.log(item);
    this.navCtrl.push(ImagesPage, {
      item: item
    });
  }

}
