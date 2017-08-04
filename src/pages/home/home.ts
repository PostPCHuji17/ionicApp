import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {authService} from "../../services/authService";
import {SplashScreen} from "@ionic-native/splash-screen";
import {LoginPage} from "../login/login";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth : authService,private viewCtrl: ViewController, public splash:SplashScreen) {
    this.auth.statusChanged().subscribe((user)=>{
      console.log("status changed from home!");
      console.log(user);
    });
  }

  ionViewCanLeave():boolean{
    return this.auth.displayName === '';
  }

  ionViewWillEnter() {
    this.splash.hide();
    this.viewCtrl.showBackButton(false);
  }

}
