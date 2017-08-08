import {Component, HostListener, Inject, ViewChild} from '@angular/core';
import {
  Content, IonicPage, LoadingController, MenuController, NavController, NavParams,
  ViewController
} from 'ionic-angular';
import {authService} from "../../services/authService";
import {SpinnerDialog} from "@ionic-native/spinner-dialog";
import {AngularFireDatabase} from "angularfire2/database";
import {dbServices} from "../../services/dbService";
import {galleryService} from "../../services/galleryService";

/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild(Content)
  content:Content;
  activeMenu : boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, public auth : authService,private viewCtrl: ViewController, public spinnerDlg:SpinnerDialog, public db : dbServices,
              public menuCtrl : MenuController, private gallery : galleryService, private loading : LoadingController) {
    this.menuCtrl.enable(true,'content');
    db.initUserProfile();
  }

  async createNewGroup(){
    const push = await this.db.createNewGroup({id:'hello',picture:'pic',title:'myGroup',email:new Array<string>(5), tags: new Array<myHome.object.Tag>(0)});
  }

  log(){
    console.log(this.db.currentGroup.transactions);
    console.log(this.db.currentGroup);
  }

  async selectGroup(groupKey){
    this.db.selectSpecifcGroup(groupKey);
  }

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }

  async getPic(){
    var loading = this.loading.create({
      content : "Uploading.."
    });
    await this.gallery.takePhoto(this.db.currentGroup.transactions['-Kqs0S6ZiIeA5Kx4QZiI'], loading);
  }

}
