

import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "angularfire2/database";
import {authService} from "./authService";
import 'rxjs/add/operator/take'

@Injectable()
export class dbServices {
  public currentUser = {} as myHome.object.UserProfile;
  public userGroups = [] as Array<myHome.object.Group>;
  public currentGroup = {} as myHome.object.Group;
  constructor(private fireDB: AngularFireDatabase, private authServ : authService) {

  }

  async initUserProfile(){
    try{
      const profile =  await this.fireDB.object('/users/'+this.authServ.getUId());
      profile.subscribe(elem=> {
                                if(elem)this.currentUser = elem;
                                else this.currentUser = {} as myHome.object.UserProfile});
    } catch(e){
      console.log("No client logged in");
    }
  }

  async getUserGroups(){
    const profile = await this.fireDB.list('/users/'+this.authServ.getUId()+'/groups');
    profile.subscribe(groups => {
      groups.forEach((v,k) => {
        let currGroup = this.fireDB.object('/groups/'+v.$value);
        currGroup.subscribe(elem=>{
          this.userGroups.push(elem)});
      });
    })
  }

  async createNewGroup(group : myHome.object.Group){
    // await this.fireDB.object('/users/'+this.authServ.getUId()).set({displayName : this.authServ.displayName, photoURL : this.authServ.photoURL, groups : [], email : this.authServ.fbProfile.email});
    const key = await this.fireDB.list('/groups').push(group);
    this.addGroupToUser(this.currentUser, key.getKey());
  }


  async addGroupToUser(user, groupKey){
    const ref = await this.fireDB.list('/users/'+this.authServ.getUId()+'/groups').push(groupKey);
  }

  async createNewUser(user : myHome.object.UserProfile){
    await this.fireDB.list('/users').push(user);
  }

  async updateCurrentUser(user: myHome.object.UserProfile){
    await this.fireDB.object('/users/'+this.authServ.getUId()).set(user);
  }

  async createNewTag(tag : myHome.object.Tag, group : myHome.object.Group){
    await this.fireDB.list('/groups/'+group.id+'/tags').push(tag)
  }

  async updateTag(tag: myHome.object.Tag, group : myHome.object.Group){
    await this.fireDB.object('/groups/'+group.id+'/tags/'+tag.id).set(tag)
  }


}
