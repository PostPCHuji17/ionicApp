import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {galleryService} from "../../services/galleryService";

/**
 * Generated class for the TransactionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-transaction',
  templateUrl: 'transaction.html',
})
export class TransactionPage {

  private data : any;
  private key : string;
  private photos : Array<string> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private gallery : galleryService, private loading : LoadingController) {
    this.data = this.navParams.data.value;
    this.key = this.navParams.data.key;
    this.data.amountColor = this.data.amount > 0 ? 'green' : 'red';
    this.data.amount = this.data.amount > 0 ? this.data.amount : this.data.amount*-1;
  }

  async addPic(){
    const load = this.loading.create({
      content: 'uploading picture'
    });
    let photo = await this.gallery.takePhoto(this.key, load);
    this.photos.push(photo);
  }

  ionViewDidLoad() {
    console.log(this.navParams.data);
    console.log('ionViewDidLoad TransactionPage');
  }

}
