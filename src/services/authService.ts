import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth'
import * as firebase from "firebase/app";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
// import AuthCredential = firebase.auth.AuthCredential;

@Injectable()
export class authService {

  displayName = '' as string;
  public userProfile: Subject<firebase.User> = new Subject<firebase.User>();
  constructor(private fireAuth: AngularFireAuth) {
    fireAuth.authState.subscribe((user: firebase.User) => {
        if(user) {
          this.displayName = user.email;
          this.userProfile.next(user);
        } else {
          this.displayName = '';
          this.userProfile.next(null);
        }
      })
  }

  public statusChanged() : Observable<any> {
    return this.userProfile.asObservable();
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
