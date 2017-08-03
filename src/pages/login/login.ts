import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {User} from "../../modules/user";
import {authService} from "../../services/authService";
import {RegisterPage} from "../register/register";
import * as firebase from "firebase/app";
import AuthCredential = firebase.auth.AuthCredential;
import UserCredential = firebase.auth.UserCredential;

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

  user = {} as User;
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth : authService, private platform : Platform) {
    platform.ready().then(()=>this.auth.auth());
  }

  async login(){
    const user = this.auth.login(this.user);
  }

  register(){
    this.navCtrl.push(RegisterPage)
  }

  async userAuth(){
    const creds = localStorage.getItem('userCreds');
    try{
      if(creds){
        const results = await this.auth.auth();
        console.log(results);
      }
    }
    catch(e){
      return true;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
}
