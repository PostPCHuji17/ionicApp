import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth'
import * as firebase from "firebase/app";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
// import AuthCredential = firebase.auth.AuthCredential;

@Injectable()
export class authService {

  displayName = '' as string;
  photoURL = '' as string;
  private fbProfile : firebase.User;
  public userProfile: Subject<firebase.User> = new Subject<firebase.User>();
  constructor(private fireAuth: AngularFireAuth) {
    fireAuth.authState.subscribe((user: firebase.User) => {
        if(user) {
          console.log(user);
          this.displayName = user.displayName;
          this.photoURL = user.photoURL;
          this.fbProfile = user;
          this.userProfile.next(user);
        } else {
          this.displayName = '';
          this.fbProfile = null;
          this.userProfile.next(null);
        }
      })
  }

  public updateFBProfile(photo : string, displayName : string){
    this.fbProfile.updateProfile({photoURL : photo, displayName : displayName})
  }

  public triggerUserProfile(){
    this.userProfile.next(this.fbProfile);
  }

  public statusChanged() : Observable<any> {
    return this.userProfile.asObservable();
  }

  public getUId() {
    if(this.fbProfile === null) return '';
    return this.fbProfile.uid;
  }

  async register(user: myHome.object.UserPrems) {
    try {
      const results = await this.fireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      if (!results) return null;
    } catch (e) {
      console.log(e);
    }
  }

  async login(user: myHome.object.UserPrems) {
    try {
      const results = await this.fireAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if (!results) return null;
      results.code = 200;
      return results;
    } catch (e) {
      return e
    }
  }

  async loginWithGoogle(){
    this.fireAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider);
  }

  async signOut(){
    try {
      const results = await this.fireAuth.auth.signOut();
      console.log(results);
      if (!results) return null;
    } catch(e){
      console.log(e);
      console.log("error");
    }
  }
}
