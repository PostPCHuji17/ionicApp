import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import {authService} from "../../services/authService";
import {RegisterPage} from "../register/register";
import * as firebase from "firebase/app";
import { SpinnerDialog } from '@ionic-native/spinner-dialog';


/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as myHome.object.UserPrems;
  public errMsg = '' as string;
  constructor(private spinner: SpinnerDialog, public navCtrl: NavController, private viewCtrl : ViewController, public navParams: NavParams, private auth : authService, private platform : Platform) {
  }

  async login(){
    this.spinner.show();
    const results = await this.auth.login(this.user);
    setTimeout(()=>this.spinner.hide(),1000);
    console.log("Logging in...");
    if(results.code !== 200){
      console.log("Err in connection");
      this.errMsg = results.message;
    } else {
      console.log("redirect to homepage");
    }
  }

  register(){
    this.navCtrl.push(RegisterPage)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPag...e');
    this.viewCtrl.showBackButton(false);
  }
}
