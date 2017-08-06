

import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "angularfire2/database";
import {authService} from "./authService";
import 'rxjs/add/operator/take'
import {min} from "rxjs/operator/min";

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
        profile.update({displayName : this.authServ.displayName, email : this.authServ.fbProfile.email, photoURL : this.authServ.photoURL});
        this.currentUser = elem;
        if(elem.selectedGroup) this.selectSpecifcGroup(elem.selectedGroup);
      })
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

  async selectSpecifcGroup(groupKey) {
    console.log("Selecting specific group");
    const group = await this.fireDB.object('/groups/' + groupKey).take(1);
    group.subscribe(groupElem => {
      console.log(groupElem);
      this.currentGroup = groupElem;
      this.currentGroup.transaction = [];
      Object.keys(groupElem.transactions).forEach(k => this.currentGroup.transaction.push(groupElem.transactions[k]));
      this.currentGroup.plus = 0;
      this.currentGroup.minus = 0;
      console.log(this.currentGroup.transactions);
      groupElem.transaction.forEach(v => this.currentGroup.plus += Math.max(0,v.amount));
      groupElem.transaction.forEach(v => this.currentGroup.minus += Math.min(0,v.amount));
    });
    await this.fireDB.object('/users/' + this.authServ.getUId()).update({'selectedGroup': groupKey});
  }

  async createNewGroup(group : myHome.object.Group){
    console.log("Creating new group..");
    const key = await this.fireDB.list('/groups').push(group);
    let trans = [
      {
        "creator": "Heather May",
        "datetime": "2017-09-24 22:34:07",
        "description": "Arcu Vestibulum Company",
        "id": 1,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": 996
      },
      {
        "creator": "Lacota Greene",
        "datetime": "2017-05-11 14:51:39",
        "description": "Nec Tempus Mauris Incorporated",
        "id": 2,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -1737
      },
      {
        "creator": "Sophia Huff",
        "datetime": "2018-05-07 15:06:58",
        "description": "In Molestie Tortor Corporation",
        "id": 3,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -654
      },
      {
        "creator": "Tamekah Cervantes",
        "datetime": "2018-03-14 09:02:03",
        "description": "Integer Incorporated",
        "id": 4,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -1193
      },
      {
        "creator": "Ivana Maddox",
        "datetime": "2018-07-02 03:54:45",
        "description": "Vel PC",
        "id": 5,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -1204
      },
      {
        "creator": "Lawrence Vincent",
        "datetime": "2017-01-18 17:19:28",
        "description": "Consequat Limited",
        "id": 6,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": 1909
      },
      {
        "creator": "Eden Scott",
        "datetime": "2018-02-22 20:49:16",
        "description": "Ac Facilisis Facilisis Foundation",
        "id": 7,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": 205
      },
      {
        "creator": "Carissa Howe",
        "datetime": "2017-05-15 13:43:22",
        "description": "Gravida Consulting",
        "id": 8,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": 1305
      },
      {
        "creator": "Gray Kramer",
        "datetime": "2018-04-10 19:39:26",
        "description": "Quis LLP",
        "id": 9,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -157
      },
      {
        "creator": "Cruz Reyes",
        "datetime": "2018-03-20 19:29:35",
        "description": "A Aliquet Vel Industries",
        "id": 10,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": 924
      },
      {
        "creator": "Madonna Dickson",
        "datetime": "2017-05-20 09:02:00",
        "description": "Fermentum Fermentum Arcu LLP",
        "id": 11,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": 641
      },
      {
        "creator": "Ryder Fuller",
        "datetime": "2017-04-09 20:43:05",
        "description": "Lacus Inc.",
        "id": 12,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -1755
      },
      {
        "creator": "Heidi Henry",
        "datetime": "2016-09-18 17:06:19",
        "description": "Arcu LLP",
        "id": 13,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": 810
      },
      {
        "creator": "Bianca Branch",
        "datetime": "2016-10-06 05:47:34",
        "description": "Felis Purus Institute",
        "id": 14,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -1950
      },
      {
        "creator": "Faith Mills",
        "datetime": "2017-10-12 12:57:32",
        "description": "Bibendum Fermentum Metus Incorporated",
        "id": 15,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": 889
      },
      {
        "creator": "Lunea Villarreal",
        "datetime": "2018-05-04 17:55:54",
        "description": "Varius Nam Porttitor PC",
        "id": 16,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -1516
      },
      {
        "creator": "Pandora Gregory",
        "datetime": "2018-01-15 19:25:02",
        "description": "Ac Orci Associates",
        "id": 17,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": 583
      },
      {
        "creator": "Nichole Wallace",
        "datetime": "2016-10-28 03:50:26",
        "description": "Magnis Dis Parturient Corporation",
        "id": 18,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": 642
      },
      {
        "creator": "Tarik Booker",
        "datetime": "2017-09-12 07:43:43",
        "description": "Arcu Associates",
        "id": 19,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": 139
      },
      {
        "creator": "Quamar Quinn",
        "datetime": "2017-11-21 22:39:19",
        "description": "Lacinia Sed Congue LLC",
        "id": 20,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": 724
      },
      {
        "creator": "Simon Burks",
        "datetime": "2018-05-01 16:45:13",
        "description": "Euismod Mauris Corp.",
        "id": 21,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -1074
      },
      {
        "creator": "Gannon Moreno",
        "datetime": "2017-12-08 15:50:30",
        "description": "Vitae Corp.",
        "id": 22,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": 426
      },
      {
        "creator": "Quynn Tran",
        "datetime": "2016-10-23 04:59:53",
        "description": "Erat Vivamus Industries",
        "id": 23,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -1780
      },
      {
        "creator": "Sylvester Long",
        "datetime": "2017-07-17 04:15:09",
        "description": "Sed Libero Institute",
        "id": 24,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": 419
      },
      {
        "creator": "Garth Mckay",
        "datetime": "2018-05-27 10:58:43",
        "description": "Amet Metus Institute",
        "id": 25,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -1958
      },
      {
        "creator": "Regina Nash",
        "datetime": "2016-12-04 17:46:14",
        "description": "Nisi Dictum Associates",
        "id": 26,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -1425
      },
      {
        "creator": "Brittany Sears",
        "datetime": "2017-10-05 11:20:29",
        "description": "Et Euismod Et Company",
        "id": 27,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": 995
      },
      {
        "creator": "Ramona Sellers",
        "datetime": "2017-06-28 15:13:20",
        "description": "Sodales PC",
        "id": 28,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -400
      },
      {
        "creator": "Price Alford",
        "datetime": "2017-12-02 09:26:02",
        "description": "Aptent Associates",
        "id": 29,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": 1039
      },
      {
        "creator": "Benjamin Mcclain",
        "datetime": "2017-10-02 15:06:31",
        "description": "Nisl Corp.",
        "id": 30,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": 1843
      },
      {
        "creator": "Alea Coffey",
        "datetime": "2017-01-23 09:59:43",
        "description": "Ante Industries",
        "id": 31,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": 1827
      },
      {
        "creator": "Jasper Whitfield",
        "datetime": "2016-09-17 23:54:34",
        "description": "Accumsan Institute",
        "id": 32,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -284
      },
      {
        "creator": "Quentin Anthony",
        "datetime": "2018-03-05 12:21:18",
        "description": "Lorem Ipsum Sodales Consulting",
        "id": 33,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": 1394
      },
      {
        "creator": "Blaze Rosario",
        "datetime": "2016-11-07 22:06:49",
        "description": "Posuere Corporation",
        "id": 34,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -1875
      },
      {
        "creator": "Rigel David",
        "datetime": "2017-07-18 10:27:52",
        "description": "Convallis Ante Inc.",
        "id": 35,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": 1317
      },
      {
        "creator": "Pearl Mann",
        "datetime": "2018-06-13 17:06:39",
        "description": "Amet Limited",
        "id": 36,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -991
      },
      {
        "creator": "India Silva",
        "datetime": "2017-03-15 15:25:43",
        "description": "Vestibulum Mauris LLC",
        "id": 37,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -547
      },
      {
        "creator": "Nicole Carey",
        "datetime": "2018-01-03 04:19:41",
        "description": "Justo Proin Non LLP",
        "id": 38,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -876
      },
      {
        "creator": "Ezra Bender",
        "datetime": "2017-12-29 02:41:30",
        "description": "Nam Corporation",
        "id": 39,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": 1355
      },
      {
        "creator": "Howard Mooney",
        "datetime": "2016-09-15 22:52:04",
        "description": "Donec LLC",
        "id": 40,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -1254
      },
      {
        "creator": "Cade Bentley",
        "datetime": "2017-06-07 22:06:42",
        "description": "Sagittis Ltd",
        "id": 41,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": 1552
      },
      {
        "creator": "Connor Nixon",
        "datetime": "2017-10-03 10:50:17",
        "description": "Enim Associates",
        "id": 42,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -995
      },
      {
        "creator": "Colette Mcmahon",
        "datetime": "2018-07-31 16:18:12",
        "description": "Ac Orci Foundation",
        "id": 43,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": 1826
      },
      {
        "creator": "Cody Gilbert",
        "datetime": "2017-09-07 01:56:05",
        "description": "Sapien Nunc Pulvinar LLP",
        "id": 44,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": 1839
      },
      {
        "creator": "April Ashley",
        "datetime": "2018-03-15 17:03:56",
        "description": "Et Magna LLP",
        "id": 45,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -1036
      },
      {
        "creator": "Wendy Bartlett",
        "datetime": "2018-04-19 19:25:05",
        "description": "Pretium Institute",
        "id": 46,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": 629
      },
      {
        "creator": "Sara Cantrell",
        "datetime": "2018-07-30 20:43:17",
        "description": "Nascetur Ridiculus Mus LLC",
        "id": 47,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": 762
      },
      {
        "creator": "Portia Kemp",
        "datetime": "2017-03-29 21:23:21",
        "description": "Sed Id Company",
        "id": 48,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": 415
      },
      {
        "creator": "Ezekiel Lucas",
        "datetime": "2017-09-13 09:17:09",
        "description": "Vestibulum Massa Consulting",
        "id": 49,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": 368
      },
      {
        "creator": "Victor Mclean",
        "datetime": "2017-01-11 16:43:57",
        "description": "Vivamus Nisi Mauris Company",
        "id": 50,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -731
      },
      {
        "creator": "Reed Burke",
        "datetime": "2018-04-23 21:00:32",
        "description": "At Arcu Industries",
        "id": 51,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": 498
      },
      {
        "creator": "Kitra Gould",
        "datetime": "2017-12-13 08:26:41",
        "description": "Amet Ante PC",
        "id": 52,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": 676
      },
      {
        "creator": "Giselle York",
        "datetime": "2017-08-22 22:29:13",
        "description": "Nec Ante Maecenas Foundation",
        "id": 53,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": 595
      },
      {
        "creator": "Phoebe Day",
        "datetime": "2018-05-05 07:20:35",
        "description": "Quam Incorporated",
        "id": 54,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": 1714
      },
      {
        "creator": "Petra Winters",
        "datetime": "2017-03-29 09:06:29",
        "description": "Cursus Industries",
        "id": 55,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -1799
      },
      {
        "creator": "Joseph Chambers",
        "datetime": "2016-11-25 21:33:54",
        "description": "Suspendisse Corporation",
        "id": 56,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -1603
      },
      {
        "creator": "Moses Riddle",
        "datetime": "2017-08-09 13:49:02",
        "description": "Ullamcorper Velit LLP",
        "id": 57,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -751
      },
      {
        "creator": "Lenore Schwartz",
        "datetime": "2017-08-01 21:58:06",
        "description": "Sed Nulla Industries",
        "id": 58,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": 1897
      },
      {
        "creator": "Chancellor Pearson",
        "datetime": "2016-08-06 01:57:54",
        "description": "Tristique Senectus Et Consulting",
        "id": 59,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -1445
      },
      {
        "creator": "Orli Dorsey",
        "datetime": "2017-05-06 21:15:46",
        "description": "Venenatis A Magna Industries",
        "id": 60,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": 1658
      },
      {
        "creator": "Julian Baldwin",
        "datetime": "2017-04-20 19:07:55",
        "description": "Aliquam Corp.",
        "id": 61,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -286
      },
      {
        "creator": "Xanthus Edwards",
        "datetime": "2018-07-04 00:32:59",
        "description": "Nec Tempus Mauris Consulting",
        "id": 62,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": 1565
      },
      {
        "creator": "Sandra Perez",
        "datetime": "2017-08-29 01:01:23",
        "description": "Nibh Dolor Foundation",
        "id": 63,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -946
      },
      {
        "creator": "Myles Hutchinson",
        "datetime": "2018-03-22 08:24:57",
        "description": "Gravida Molestie Arcu Industries",
        "id": 64,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": 1338
      },
      {
        "creator": "Mari Zimmerman",
        "datetime": "2017-11-25 06:28:45",
        "description": "Ac Turpis LLP",
        "id": 65,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -724
      },
      {
        "creator": "Brody William",
        "datetime": "2018-01-05 04:17:25",
        "description": "Diam Pellentesque Ltd",
        "id": 66,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -664
      },
      {
        "creator": "Otto Odom",
        "datetime": "2018-05-17 10:47:03",
        "description": "Non Industries",
        "id": 67,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": 209
      },
      {
        "creator": "Bertha Petty",
        "datetime": "2018-06-09 19:31:24",
        "description": "Ultrices Incorporated",
        "id": 68,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": 1046
      },
      {
        "creator": "Deanna Velez",
        "datetime": "2017-02-20 15:15:38",
        "description": "Libero Limited",
        "id": 69,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -1560
      },
      {
        "creator": "Sonya Moran",
        "datetime": "2018-04-18 05:42:49",
        "description": "Consectetuer Adipiscing LLC",
        "id": 70,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": 1709
      },
      {
        "creator": "Amos Rodriquez",
        "datetime": "2017-09-13 06:53:49",
        "description": "Aliquam Eros LLC",
        "id": 71,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -1074
      },
      {
        "creator": "Lucy Berger",
        "datetime": "2017-06-21 03:33:25",
        "description": "Eu Limited",
        "id": 72,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": 1343
      },
      {
        "creator": "Charity Justice",
        "datetime": "2018-02-05 04:13:06",
        "description": "Ut LLC",
        "id": 73,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": 302
      },
      {
        "creator": "MacKenzie Murray",
        "datetime": "2016-09-13 23:28:40",
        "description": "Luctus Et Ultrices Company",
        "id": 74,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": 443
      },
      {
        "creator": "Piper Aguirre",
        "datetime": "2017-10-04 16:12:48",
        "description": "Vulputate Velit Corp.",
        "id": 75,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -1837
      },
      {
        "creator": "Simon Trevino",
        "datetime": "2016-11-28 00:50:46",
        "description": "Magna Cras Convallis Company",
        "id": 76,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -423
      },
      {
        "creator": "Aurelia Foreman",
        "datetime": "2017-10-16 15:40:28",
        "description": "Bibendum Incorporated",
        "id": 77,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": 1739
      },
      {
        "creator": "Vernon Downs",
        "datetime": "2017-09-22 02:42:45",
        "description": "Non Sollicitudin A LLP",
        "id": 78,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -1677
      },
      {
        "creator": "Tyrone Shepard",
        "datetime": "2018-04-16 18:25:44",
        "description": "At Iaculis Quis Inc.",
        "id": 79,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -1836
      },
      {
        "creator": "Justine Maynard",
        "datetime": "2016-09-26 12:18:14",
        "description": "Vitae Erat Vel LLP",
        "id": 80,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -964
      },
      {
        "creator": "Kerry Murphy",
        "datetime": "2017-03-03 06:02:21",
        "description": "Lobortis Augue LLC",
        "id": 81,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -647
      },
      {
        "creator": "Rashad Mccray",
        "datetime": "2018-05-12 01:17:05",
        "description": "Sit Incorporated",
        "id": 82,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": 795
      },
      {
        "creator": "Fiona Sparks",
        "datetime": "2017-04-27 15:18:39",
        "description": "Fermentum Convallis Ligula Company",
        "id": 83,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": 695
      },
      {
        "creator": "Sylvester Black",
        "datetime": "2018-01-17 13:05:33",
        "description": "Nunc Ullamcorper Eu Inc.",
        "id": 84,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -840
      },
      {
        "creator": "Eliana Edwards",
        "datetime": "2017-07-17 05:41:27",
        "description": "Suspendisse Eleifend Institute",
        "id": 85,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -1250
      },
      {
        "creator": "Clarke Davidson",
        "datetime": "2018-01-29 07:13:25",
        "description": "Turpis Corp.",
        "id": 86,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": 309
      },
      {
        "creator": "Evangeline Love",
        "datetime": "2018-04-18 15:13:23",
        "description": "Aliquam Adipiscing Lobortis LLP",
        "id": 87,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": 1995
      },
      {
        "creator": "Caleb Cohen",
        "datetime": "2017-02-17 17:01:38",
        "description": "Cursus Et Eros Foundation",
        "id": 88,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -1052
      },
      {
        "creator": "Ali Maynard",
        "datetime": "2016-11-11 04:52:24",
        "description": "Eu Institute",
        "id": 89,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -1596
      },
      {
        "creator": "Kirestin Frazier",
        "datetime": "2018-03-14 21:53:16",
        "description": "Neque Sed Eget Inc.",
        "id": 90,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -548
      },
      {
        "creator": "Orli Barlow",
        "datetime": "2016-08-13 04:23:17",
        "description": "Luctus Ipsum Institute",
        "id": 91,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -1473
      },
      {
        "creator": "Rogan Tran",
        "datetime": "2016-12-15 14:39:31",
        "description": "Vel Arcu Curabitur Corporation",
        "id": 92,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -784
      },
      {
        "creator": "Tatiana Long",
        "datetime": "2017-04-24 05:26:50",
        "description": "Nascetur Company",
        "id": 93,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": 836
      },
      {
        "creator": "Shana Jones",
        "datetime": "2016-08-17 19:13:27",
        "description": "Vel Mauris Corp.",
        "id": 94,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -591
      },
      {
        "creator": "Josephine Macias",
        "datetime": "2017-01-25 15:47:50",
        "description": "Dui In Sodales Industries",
        "id": 95,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -1801
      },
      {
        "creator": "Yoko Bowen",
        "datetime": "2018-07-21 08:35:01",
        "description": "Amet Corporation",
        "id": 96,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -1785
      },
      {
        "creator": "Yasir Wilkerson",
        "datetime": "2017-10-13 23:56:48",
        "description": "Nec Enim Corporation",
        "id": 97,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -2000
      },
      {
        "creator": "Amena Andrews",
        "datetime": "2016-12-31 18:16:18",
        "description": "Gravida Incorporated",
        "id": 98,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -647
      },
      {
        "creator": "Claudia Stanton",
        "datetime": "2018-03-22 08:58:17",
        "description": "Enim Diam Industries",
        "id": 99,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -1136
      },
      {
        "creator": "Urielle Sanford",
        "datetime": "2017-06-11 04:14:56",
        "description": "Purus Accumsan Interdum Foundation",
        "id": 100,
        "photoURL": "https://lh5.googleusercontent.com/-dLWO__yJq4g/AAAAAAAAAAI/AAAAAAAAASg/XmGHxrtbKXE/photo.jpg",
        "amount": -626
      }
    ];
    const keys = await this.fireDB.list('/groups/'+key.getKey()+'/transactions');
    trans.forEach(k => keys.push(k));
    await this.fireDB.object('/users/' + this.authServ.getUId()).update({'selectedGroup': key.getKey()});
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
