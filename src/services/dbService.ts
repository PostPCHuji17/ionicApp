

import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "angularfire2/database";
import {authService} from "./authService";

@Injectable()
export class dbServices {
  public currentUser = {} as myHome.object.UserProfile;
  constructor(private fireDB: AngularFireDatabase, private authServ : authService) {

  }

  async initUserProfile(){
    try{
      const profile =  await this.fireDB.object('/users/'+this.authServ.getUId());
      profile.subscribe(elem=>this.currentUser = elem);
    } catch(e){
      console.log("No client logged in");
    }

  }

  async getUserGroups(){
    const profile = this.fireDB.list('/groups', {query : {orderByChild : 'members'}});
    profile.subscribe(groups => {
      groups.forEach(group => console.log(group));
    })
  }

  async createNewGroup(group : myHome.object.Group){
    await this.fireDB.list('/groups').push(group);
  }

  async createNewUser(user : myHome.object.UserProfile){
    await this.fireDB.list('/users').push(user);
  }

  async updateCurrentUser(user: myHome.object.UserProfile){
    await this.fireDB.object('/users/'+this.currentUser.id).set(user);
  }

  async createNewTag(tag : myHome.object.Tag, group : myHome.object.Group){
    await this.fireDB.list('/groups/'+group.id+'/tags').push(tag)
  }

  async updateTag(tag: myHome.object.Tag, group : myHome.object.Group){
    await this.fireDB.object('/groups/'+group.id+'/tags/'+tag.id).set(tag)
  }


}
