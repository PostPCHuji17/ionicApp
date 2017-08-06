import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {authService} from "../../services/authService";
import {PostRegisterPage} from "../post-register/post-register";

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {} as myHome.object.UserPrems;
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: authService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(){
    this.auth.register(this.user);
    this.navCtrl.push(PostRegisterPage);
  }

}
