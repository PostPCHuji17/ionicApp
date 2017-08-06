import { Component } from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams, ViewController} from 'ionic-angular';
import {authService} from "../../services/authService";
import {SpinnerDialog} from "@ionic-native/spinner-dialog";
import {AngularFireDatabase} from "angularfire2/database";
import {dbServices} from "../../services/dbService";

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
  activeMenu : string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public auth : authService,private viewCtrl: ViewController, public spinnerDlg:SpinnerDialog, public db : dbServices,
              public menuCtrl : MenuController) {
    this.activeMenu = 'content';
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

  ionViewCanLeave():boolean{
    return this.auth.displayName === '';
  }

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }

}
