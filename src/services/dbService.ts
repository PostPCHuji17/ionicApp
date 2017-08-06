

import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "angularfire2/database";
import {authService} from "./authService";
import 'rxjs/add/operator/take'

@Injectable()
export class dbServices {
  public currentUser = {} as myHome.object.UserProfile;
  public userGroups = [] as Array<myHome.object.Group>;
  public currentGroup = null;
  constructor(private fireDB: AngularFireDatabase, private authServ : authService) {

  }

  async initUserProfile(){
    try{
      const profile =  await this.fireDB.object('/users/'+this.authServ.getUId());
      profile.subscribe(elem=> {
                                if(elem) {
                                  this.currentUser = elem;
                                  if(elem.selectedGroup) this.selectSpecifcGroup(elem.selectedGroup);
                                }
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

  async selectSpecifcGroup(groupKey){
    const group = await this.fireDB.object('/groups/'+groupKey);
    group.subscribe(groupElem => this.currentGroup = groupElem);
    await this.fireDB.object('/users/'+this.authServ.getUId()).update({'selectedGroup' : groupKey});
  }

  async createNewGroup(group : myHome.object.Group){
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
