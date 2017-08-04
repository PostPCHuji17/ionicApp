import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";
import {authService} from "../../services/authService";
import {LoginPage} from "../login/login";
import {SplashScreen} from "@ionic-native/splash-screen";

/**
 * Generated class for the StarterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-starter',
  templateUrl: 'starter.html',
})
export class StarterPage {

  public beenHereDoneThat : boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth : authService, private splash : SplashScreen) {
    this.auth.statusChanged().subscribe((user)=>{
      if(user) {
        this.beenHereDoneThat = false;
        this.navCtrl.push(HomePage);
      } else {
        this.beenHereDoneThat = false;
        this.navCtrl.push(LoginPage);
      }
    });
    this.splash.show();
    setTimeout(()=>{
      this.splash.hide();
      if(this.auth.displayName === ''){
        this.beenHereDoneThat = false;
        this.navCtrl.push(LoginPage);
      }
    }, 1000)
  }

  ionViewCanEnter(){
    return this.beenHereDoneThat;
  }

}
