import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule, Loading, LoadingController} from 'ionic-angular';
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
import {dbServices} from "../services/dbService";
import {PostRegisterPage} from "../pages/post-register/post-register";
import {Facebook} from "@ionic-native/facebook";
import { TransactionComponent } from '../components/transaction/transaction';
import {ImagePicker} from "@ionic-native/image-picker";
import {galleryService} from "../services/galleryService";
import {Camera} from "@ionic-native/camera";
import {TransactionPage} from "../pages/transaction/transaction";

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    HomePage,
    StarterPage,
    PostRegisterPage,
    TransactionComponent,
    TransactionPage
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
    StarterPage,
    PostRegisterPage,
    TransactionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    authService,
    dbServices,
    galleryService,
    AngularFireAuth,
    AngularFireDatabase,
    SpinnerDialog,
    Facebook,
    ImagePicker,
    Camera,
    LoadingController
  ]
})
export class AppModule {}
