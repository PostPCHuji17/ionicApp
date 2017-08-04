import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import {AngularFireModule} from "angularfire2";
import {FIREBASE_CONFIG} from "./appFirebaseConfig";
import {LoginPage} from "../pages/login/login";
import {authService} from "../services/authService";
import {AngularFireAuth} from "angularfire2/auth";
import {RegisterPage} from "../pages/register/register";
import {HomePage} from "../pages/home/home";
import {StarterPage} from "../pages/starter/starter";
import {AngularFireDatabase} from "angularfire2/database";
import {SpinnerDialog} from "@ionic-native/spinner-dialog";

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    HomePage,
    StarterPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,
    HomePage,
    StarterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    authService,
    AngularFireAuth,
    AngularFireDatabase,
    SpinnerDialog
  ]
})
export class AppModule {}
