import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {authService} from "../../services/authService";
import {dbServices} from "../../services/dbService";

/**
 * Generated class for the PostRegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-post-register',
  templateUrl: 'post-register.html',
})
export class PostRegisterPage {
  public detailsForm = {name : '', pic : ''};

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth : authService, public db : dbServices) {
    db.initUserProfile();
  }

  async addDetails(){
    let elem = this.db.currentUser as myHome.object.UserProfile;
    elem.displayName = this.detailsForm.name;
    elem.picture = this.detailsForm.pic;
    await this.db.updateCurrentUser(elem);
    await this.auth.updateFBProfile(elem.picture, elem.displayName);
    await this.auth.triggerUserProfile();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostRegisterPage');
  }

}
