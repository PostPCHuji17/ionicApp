import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth'
import {User} from "../modules/user";
// import * as firebase from "firebase/app";
// import AuthCredential = firebase.auth.AuthCredential;

@Injectable()
export class authService {
  constructor(private fireAuth: AngularFireAuth) {
  }

  async register(user: User) {
    try {
      const results = await this.fireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      if (!results) return null;
      console.log(results)
      const token = await results.getIdToken();
      console.log(token);
      localStorage.setItem("authCred", results.refreshToken);
    } catch (e) {
      console.log(e);
    }
  }

  async login(user: User) {
    try {
      const results = await this.fireAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if (!results) return null;
      console.log(results)
      const token = await results.getIdToken();
      localStorage.setItem("authCred", token);
    } catch (e) {
      return null
    }
  }

  async auth() {
    const creds = localStorage.getItem("authCred");
    try{
      const results = this.fireAuth.auth.signInWithCredential({providerId : 'password'});
      console.log(results);
    } catch(e){
      console.log(e)
    }
  }
}
