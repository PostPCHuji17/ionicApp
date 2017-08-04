import { Component } from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {authService} from "../services/authService";
import {LoginPage} from "../pages/login/login";
import {StarterPage} from "../pages/starter/starter";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = StarterPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
    });
  }
}

