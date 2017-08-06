

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

  async selectSpecifcGroup(groupKey) {
    const group = await this.fireDB.object('/groups/' + groupKey);
    group.subscribe(groupElem => {
      this.currentGroup = groupElem;
      this.currentGroup.transactions = [];
      groupElem.map((v,k) => this.currentGroup.transactions.push(v))
    });
    await this.fireDB.object('/users/' + this.authServ.getUId()).update({'selectedGroup': groupKey});
  }

  async createNewGroup(group : myHome.object.Group){
    const key = await this.fireDB.list('/groups').push(group);
    let trans = [
      {
        "id": 1,
        "creator": "Michael Walsh",
        "title": "In Mi Foundation",
        "description": "parturient.montes.nascetur@anteipsum.net",
        "datetime": "2017-03-05 22:24:49"
      },
      {
        "id": 2,
        "creator": "Cairo Keller",
        "title": "Leo Industries",
        "description": "elementum@quis.org",
        "datetime": "2018-02-24 22:38:15"
      },
      {
        "id": 3,
        "creator": "Amal Robertson",
        "title": "Orci Consectetuer Company",
        "description": "enim.sit@Nuncmauriselit.org",
        "datetime": "2016-11-22 12:57:59"
      },
      {
        "id": 4,
        "creator": "Gareth Harris",
        "title": "Accumsan Sed Ltd",
        "description": "hymenaeos@ridiculus.org",
        "datetime": "2017-01-17 17:43:11"
      },
      {
        "id": 5,
        "creator": "Barclay Wagner",
        "title": "Dis Associates",
        "description": "lectus.convallis.est@molestietortornibh.com",
        "datetime": "2016-12-18 04:30:55"
      },
      {
        "id": 6,
        "creator": "Bradley Greer",
        "title": "Eleifend Corp.",
        "description": "Donec.est@dui.co.uk",
        "datetime": "2016-09-09 21:47:49"
      },
      {
        "id": 7,
        "creator": "Quinlan Small",
        "title": "Morbi Corporation",
        "description": "amet@quam.edu",
        "datetime": "2018-02-03 18:18:38"
      },
      {
        "id": 8,
        "creator": "Reed Davenport",
        "title": "A Neque Corporation",
        "description": "Nullam.enim.Sed@odiovelest.ca",
        "datetime": "2018-08-06 07:09:08"
      },
      {
        "id": 9,
        "creator": "Lars Roberson",
        "title": "Sed Company",
        "description": "tempus@sapienCras.co.uk",
        "datetime": "2017-11-14 04:04:50"
      },
      {
        "id": 10,
        "creator": "Bert Marsh",
        "title": "Turpis Vitae Corporation",
        "description": "et.magnis.dis@velit.ca",
        "datetime": "2016-08-12 07:20:25"
      },
      {
        "id": 11,
        "creator": "Herman Kelly",
        "title": "Risus Donec Egestas Corporation",
        "description": "aliquet.lobortis@vitae.co.uk",
        "datetime": "2017-12-07 11:23:07"
      },
      {
        "id": 12,
        "creator": "Tobias Harvey",
        "title": "Iaculis Ltd",
        "description": "aliquet.Phasellus@lacus.ca",
        "datetime": "2018-03-29 23:58:01"
      },
      {
        "id": 13,
        "creator": "Fitzgerald Baldwin",
        "title": "Montes Nascetur Company",
        "description": "iaculis@metusvitaevelit.net",
        "datetime": "2017-06-09 16:58:13"
      },
      {
        "id": 14,
        "creator": "Samson Lynch",
        "title": "Vestibulum Institute",
        "description": "ipsum.non.arcu@Fusce.net",
        "datetime": "2017-11-12 09:13:26"
      },
      {
        "id": 15,
        "creator": "Fuller Holden",
        "title": "Arcu Eu Consulting",
        "description": "enim.consequat@dapibusquamquis.edu",
        "datetime": "2018-08-04 06:31:49"
      },
      {
        "id": 16,
        "creator": "Oscar Langley",
        "title": "Eu Turpis Corporation",
        "description": "eu.turpis@in.ca",
        "datetime": "2018-01-11 21:35:35"
      },
      {
        "id": 17,
        "creator": "Wesley Sampson",
        "title": "Sem Egestas PC",
        "description": "pharetra.sed.hendrerit@lobortisquis.com",
        "datetime": "2018-07-03 17:22:46"
      },
      {
        "id": 18,
        "creator": "Bradley Luna",
        "title": "Lectus Cum Sociis Industries",
        "description": "ante.lectus@Praesenteunulla.co.uk",
        "datetime": "2017-10-26 08:34:22"
      },
      {
        "id": 19,
        "creator": "Fitzgerald Massey",
        "title": "Imperdiet Ullamcorper Industries",
        "description": "dictum.placerat.augue@Sed.edu",
        "datetime": "2016-11-20 21:42:51"
      },
      {
        "id": 20,
        "creator": "Kaseem Mack",
        "title": "Turpis Aliquam Adipiscing LLP",
        "description": "ante@sagittisplacerat.ca",
        "datetime": "2016-12-15 07:46:15"
      },
      {
        "id": 21,
        "creator": "Buckminster Pratt",
        "title": "Dictum Sapien Aenean Corp.",
        "description": "Suspendisse.non@a.co.uk",
        "datetime": "2017-09-30 09:14:04"
      },
      {
        "id": 22,
        "creator": "Michael Ratliff",
        "title": "Mauris Quis Turpis Corporation",
        "description": "mi@Nullaeget.org",
        "datetime": "2018-04-14 15:58:46"
      },
      {
        "id": 23,
        "creator": "Chancellor Rush",
        "title": "Est Tempor Limited",
        "description": "Nunc.commodo.auctor@Nam.org",
        "datetime": "2017-02-02 16:57:32"
      },
      {
        "id": 24,
        "creator": "Gareth Whitley",
        "title": "Dictum Consulting",
        "description": "vel@nunc.net",
        "datetime": "2018-04-10 08:02:15"
      },
      {
        "id": 25,
        "creator": "Tiger Cote",
        "title": "Lacus Company",
        "description": "mi.enim.condimentum@sollicitudinadipiscingligula.org",
        "datetime": "2017-09-12 20:02:05"
      },
      {
        "id": 26,
        "creator": "Henry Nixon",
        "title": "Nonummy Associates",
        "description": "Cras@erat.net",
        "datetime": "2017-10-01 15:46:35"
      },
      {
        "id": 27,
        "creator": "Flynn Raymond",
        "title": "Tempor Augue Ac Associates",
        "description": "dui@sem.ca",
        "datetime": "2018-05-10 11:51:33"
      },
      {
        "id": 28,
        "creator": "Lee Evans",
        "title": "Sit Ltd",
        "description": "auctor@Namnullamagna.com",
        "datetime": "2016-12-24 20:36:33"
      },
      {
        "id": 29,
        "creator": "Graiden Greene",
        "title": "Non Limited",
        "description": "ante.Nunc.mauris@semper.org",
        "datetime": "2017-05-16 07:13:03"
      },
      {
        "id": 30,
        "creator": "Tyler Serrano",
        "title": "Urna Et Associates",
        "description": "sociosqu.ad.litora@primis.ca",
        "datetime": "2017-04-02 14:10:40"
      },
      {
        "id": 31,
        "creator": "Cadman Serrano",
        "title": "Ante Lectus Convallis Institute",
        "description": "nibh.Aliquam@Fuscediamnunc.com",
        "datetime": "2017-05-01 04:43:17"
      },
      {
        "id": 32,
        "creator": "Malik Mccarty",
        "title": "Dui Lectus Institute",
        "description": "turpis@tristiquesenectus.org",
        "datetime": "2018-07-02 05:53:48"
      },
      {
        "id": 33,
        "creator": "Travis Wheeler",
        "title": "Malesuada Malesuada Integer LLC",
        "description": "vitae@Quisqueac.co.uk",
        "datetime": "2018-02-06 09:25:36"
      },
      {
        "id": 34,
        "creator": "Harding Burt",
        "title": "Curabitur Ut Odio Associates",
        "description": "eu.dolor@ipsumnunc.co.uk",
        "datetime": "2018-04-16 02:05:19"
      },
      {
        "id": 35,
        "creator": "Elijah Christensen",
        "title": "Vitae Ltd",
        "description": "eleifend@a.com",
        "datetime": "2017-06-08 03:35:51"
      },
      {
        "id": 36,
        "creator": "Bruce Conley",
        "title": "Imperdiet Ornare Foundation",
        "description": "Quisque.varius@dapibus.ca",
        "datetime": "2017-05-10 00:21:20"
      },
      {
        "id": 37,
        "creator": "Simon Webb",
        "title": "Vestibulum Accumsan Foundation",
        "description": "metus.urna.convallis@sit.co.uk",
        "datetime": "2016-09-21 16:28:31"
      },
      {
        "id": 38,
        "creator": "Hiram Velasquez",
        "title": "Nulla Tempor Institute",
        "description": "lacus@erosnonenim.com",
        "datetime": "2017-09-10 09:12:17"
      },
      {
        "id": 39,
        "creator": "Magee Kaufman",
        "title": "Et Incorporated",
        "description": "gravida@Quisquevarius.co.uk",
        "datetime": "2017-12-26 07:15:38"
      },
      {
        "id": 40,
        "creator": "Cain Gould",
        "title": "Nec Institute",
        "description": "eu@Fusce.co.uk",
        "datetime": "2018-03-12 09:39:00"
      },
      {
        "id": 41,
        "creator": "Samson Francis",
        "title": "Eget Associates",
        "description": "Morbi.non@dolorDonecfringilla.ca",
        "datetime": "2017-10-31 18:56:24"
      },
      {
        "id": 42,
        "creator": "Davis Mcclain",
        "title": "Penatibus Limited",
        "description": "massa.Quisque@aliquetodio.org",
        "datetime": "2016-12-17 14:38:59"
      },
      {
        "id": 43,
        "creator": "Mohammad Stuart",
        "title": "Mauris Vel Turpis Corp.",
        "description": "ligula.eu@et.edu",
        "datetime": "2018-04-11 17:50:28"
      },
      {
        "id": 44,
        "creator": "Theodore Ford",
        "title": "Diam Luctus Inc.",
        "description": "ipsum.Suspendisse@facilisis.ca",
        "datetime": "2017-04-07 16:40:21"
      },
      {
        "id": 45,
        "creator": "Baxter Holder",
        "title": "Maecenas Corp.",
        "description": "Ut.tincidunt.vehicula@cursuspurusNullam.org",
        "datetime": "2017-11-04 10:11:19"
      },
      {
        "id": 46,
        "creator": "Rafael Lowe",
        "title": "In Consulting",
        "description": "adipiscing@facilisisfacilisis.org",
        "datetime": "2016-11-23 14:46:23"
      },
      {
        "id": 47,
        "creator": "Judah Sykes",
        "title": "Pellentesque Ut Ipsum PC",
        "description": "natoque.penatibus.et@elementumpurusaccumsan.org",
        "datetime": "2018-03-05 04:19:39"
      },
      {
        "id": 48,
        "creator": "Grant Mcfadden",
        "title": "Nisl Sem Corporation",
        "description": "nonummy.ipsum.non@ullamcorpereu.edu",
        "datetime": "2016-11-12 11:54:18"
      },
      {
        "id": 49,
        "creator": "Flynn Monroe",
        "title": "Imperdiet Nec Corporation",
        "description": "Quisque@lorem.edu",
        "datetime": "2018-05-17 12:16:49"
      },
      {
        "id": 50,
        "creator": "Harrison Orr",
        "title": "Vitae Odio Sagittis Incorporated",
        "description": "interdum@Suspendissetristiqueneque.edu",
        "datetime": "2017-11-03 10:49:20"
      },
      {
        "id": 51,
        "creator": "Ahmed Houston",
        "title": "Enim Mauris Limited",
        "description": "diam.at@elitAliquam.edu",
        "datetime": "2017-05-20 21:23:14"
      },
      {
        "id": 52,
        "creator": "Jasper Adkins",
        "title": "Enim Associates",
        "description": "vitae.velit@vehiculaaliquetlibero.edu",
        "datetime": "2017-02-04 08:36:17"
      },
      {
        "id": 53,
        "creator": "Laith Pratt",
        "title": "Ornare LLC",
        "description": "nec.euismod@disparturient.co.uk",
        "datetime": "2018-03-06 01:13:43"
      },
      {
        "id": 54,
        "creator": "Hedley Robles",
        "title": "Nunc LLC",
        "description": "pharetra.felis@sedhendrerita.ca",
        "datetime": "2017-05-13 05:33:21"
      },
      {
        "id": 55,
        "creator": "Thaddeus Grant",
        "title": "Velit Industries",
        "description": "facilisis.lorem.tristique@ipsumprimis.co.uk",
        "datetime": "2018-03-16 20:22:02"
      },
      {
        "id": 56,
        "creator": "Dieter Carpenter",
        "title": "Egestas Rhoncus Proin LLP",
        "description": "Integer.urna@euultricessit.com",
        "datetime": "2017-11-27 21:52:57"
      },
      {
        "id": 57,
        "creator": "Alec Orr",
        "title": "Diam Ltd",
        "description": "eu.odio@tellusSuspendissesed.co.uk",
        "datetime": "2017-02-19 06:47:07"
      },
      {
        "id": 58,
        "creator": "Kenneth Holder",
        "title": "Rhoncus Donec Ltd",
        "description": "neque@Integer.co.uk",
        "datetime": "2018-04-21 05:29:06"
      },
      {
        "id": 59,
        "creator": "Octavius Roth",
        "title": "Rutrum Justo Ltd",
        "description": "elit.Curabitur@arcu.edu",
        "datetime": "2016-09-09 16:24:05"
      },
      {
        "id": 60,
        "creator": "Todd Haynes",
        "title": "Purus Sapien Gravida PC",
        "description": "augue.porttitor.interdum@Cumsociis.com",
        "datetime": "2018-02-06 06:07:29"
      },
      {
        "id": 61,
        "creator": "Hoyt Rhodes",
        "title": "Risus Nulla Eget Ltd",
        "description": "erat@Vestibulumuteros.org",
        "datetime": "2017-02-14 17:27:59"
      },
      {
        "id": 62,
        "creator": "Zeph Watts",
        "title": "Varius Et Euismod PC",
        "description": "imperdiet@Praesentinterdum.org",
        "datetime": "2017-06-29 23:26:36"
      },
      {
        "id": 63,
        "creator": "Valentine Mayo",
        "title": "Ac PC",
        "description": "risus@fermentum.org",
        "datetime": "2017-08-08 13:19:41"
      },
      {
        "id": 64,
        "creator": "Noah Ayala",
        "title": "Parturient LLC",
        "description": "Nunc.mauris@massarutrummagna.net",
        "datetime": "2017-03-21 05:16:50"
      },
      {
        "id": 65,
        "creator": "Brandon Carter",
        "title": "Et LLP",
        "description": "euismod@dui.ca",
        "datetime": "2017-10-08 07:30:36"
      },
      {
        "id": 66,
        "creator": "Sean Welch",
        "title": "Eu Odio Phasellus Limited",
        "description": "dolor@Fusce.ca",
        "datetime": "2017-03-20 01:48:15"
      },
      {
        "id": 67,
        "creator": "Roth Becker",
        "title": "Semper Erat In Associates",
        "description": "eget.odio@tacitisociosquad.ca",
        "datetime": "2017-07-24 11:48:49"
      },
      {
        "id": 68,
        "creator": "Justin Richard",
        "title": "Magna Sed Limited",
        "description": "vehicula@Donec.com",
        "datetime": "2017-12-15 19:19:31"
      },
      {
        "id": 69,
        "creator": "Rafael West",
        "title": "Donec Elementum Lorem LLP",
        "description": "mauris.blandit.mattis@enim.ca",
        "datetime": "2018-04-29 19:52:34"
      },
      {
        "id": 70,
        "creator": "Michael Avila",
        "title": "Turpis Vitae Inc.",
        "description": "Quisque.nonummy.ipsum@blanditmattisCras.co.uk",
        "datetime": "2018-05-11 20:46:34"
      },
      {
        "id": 71,
        "creator": "Ray Sampson",
        "title": "Suspendisse Dui Fusce Corporation",
        "description": "Vivamus@rhoncus.ca",
        "datetime": "2018-01-09 07:20:01"
      },
      {
        "id": 72,
        "creator": "Kermit Small",
        "title": "Taciti Industries",
        "description": "iaculis@turpisNulla.org",
        "datetime": "2017-12-19 03:44:15"
      },
      {
        "id": 73,
        "creator": "Byron Wyatt",
        "title": "Ac Corp.",
        "description": "Pellentesque.tincidunt.tempus@Proin.net",
        "datetime": "2017-08-27 02:12:12"
      },
      {
        "id": 74,
        "creator": "Gabriel Petty",
        "title": "Ante Dictum Corporation",
        "description": "purus@lacusMaurisnon.edu",
        "datetime": "2017-07-13 18:22:06"
      },
      {
        "id": 75,
        "creator": "Burton Bean",
        "title": "Amet LLC",
        "description": "Vivamus@liberoestcongue.co.uk",
        "datetime": "2018-05-14 16:41:21"
      },
      {
        "id": 76,
        "creator": "Herrod Barlow",
        "title": "Quam Company",
        "description": "vehicula.risus.Nulla@amet.com",
        "datetime": "2016-11-08 10:29:00"
      },
      {
        "id": 77,
        "creator": "Merrill Molina",
        "title": "Lectus Convallis Foundation",
        "description": "tempor.erat@orci.ca",
        "datetime": "2018-07-30 05:57:20"
      },
      {
        "id": 78,
        "creator": "Dillon Boone",
        "title": "Dignissim Ltd",
        "description": "aliquam@asollicitudin.org",
        "datetime": "2017-06-29 00:56:11"
      },
      {
        "id": 79,
        "creator": "Cedric Webb",
        "title": "Ipsum Leo PC",
        "description": "Mauris@pellentesque.ca",
        "datetime": "2017-03-17 06:13:09"
      },
      {
        "id": 80,
        "creator": "Honorato Barnett",
        "title": "Sodales Purus Company",
        "description": "hendrerit.Donec@tempusscelerisquelorem.com",
        "datetime": "2017-04-13 21:06:20"
      },
      {
        "id": 81,
        "creator": "Fletcher Hutchinson",
        "title": "Arcu Consulting",
        "description": "Donec.feugiat.metus@luctussit.co.uk",
        "datetime": "2018-06-20 00:32:48"
      },
      {
        "id": 82,
        "creator": "Dane Estes",
        "title": "Primis In Foundation",
        "description": "orci.luctus@dictumsapienAenean.net",
        "datetime": "2016-09-25 09:00:14"
      },
      {
        "id": 83,
        "creator": "Thaddeus Rosa",
        "title": "Vel Institute",
        "description": "cursus.a@dignissim.com",
        "datetime": "2018-01-31 12:10:25"
      },
      {
        "id": 84,
        "creator": "Yoshio Santos",
        "title": "Non Nisi Industries",
        "description": "malesuada@duilectus.co.uk",
        "datetime": "2017-09-23 21:10:25"
      },
      {
        "id": 85,
        "creator": "Jackson Pacheco",
        "title": "Amet Orci Incorporated",
        "description": "nec.tempus@a.org",
        "datetime": "2018-05-17 10:03:15"
      },
      {
        "id": 86,
        "creator": "Benjamin Adams",
        "title": "Lorem Ut PC",
        "description": "mi@Integer.edu",
        "datetime": "2017-01-15 16:39:14"
      },
      {
        "id": 87,
        "creator": "Geoffrey Campbell",
        "title": "Aliquet Institute",
        "description": "lectus@elita.edu",
        "datetime": "2017-08-06 16:26:24"
      },
      {
        "id": 88,
        "creator": "Jackson Holman",
        "title": "Ligula Company",
        "description": "Aliquam@ategestasa.com",
        "datetime": "2018-06-18 16:55:35"
      },
      {
        "id": 89,
        "creator": "Octavius Sweeney",
        "title": "Nunc Mauris Foundation",
        "description": "Curabitur.egestas.nunc@Aliquamgravidamauris.ca",
        "datetime": "2016-10-17 18:04:13"
      },
      {
        "id": 90,
        "creator": "Reed Schroeder",
        "title": "Nulla Vulputate Company",
        "description": "ultricies.dignissim.lacus@malesuadavelvenenatis.com",
        "datetime": "2017-05-12 03:12:14"
      },
      {
        "id": 91,
        "creator": "Kennan Kelly",
        "title": "Lobortis Class Aptent Industries",
        "description": "interdum.Curabitur.dictum@quislectus.edu",
        "datetime": "2016-09-13 12:10:00"
      },
      {
        "id": 92,
        "creator": "Vladimir Yang",
        "title": "Semper Rutrum Consulting",
        "description": "ac.mattis@sempertellus.org",
        "datetime": "2017-11-19 19:38:15"
      },
      {
        "id": 93,
        "creator": "Timothy Branch",
        "title": "Elementum At Ltd",
        "description": "nulla@egetipsum.net",
        "datetime": "2016-10-10 08:14:10"
      },
      {
        "id": 94,
        "creator": "Darius Gay",
        "title": "Ullamcorper Velit Ltd",
        "description": "egestas.Sed.pharetra@lobortisnisinibh.net",
        "datetime": "2017-10-29 17:46:16"
      },
      {
        "id": 95,
        "creator": "Robert Velazquez",
        "title": "Non Inc.",
        "description": "mi.lacinia@enimNuncut.com",
        "datetime": "2018-01-29 01:18:32"
      },
      {
        "id": 96,
        "creator": "Mannix Grant",
        "title": "Quis Diam LLP",
        "description": "Pellentesque@mollisduiin.edu",
        "datetime": "2017-12-27 08:44:26"
      },
      {
        "id": 97,
        "creator": "Eagan Summers",
        "title": "Hendrerit Ltd",
        "description": "arcu.Nunc@Aliquamerat.co.uk",
        "datetime": "2018-06-24 12:13:53"
      },
      {
        "id": 98,
        "creator": "Kasper Macdonald",
        "title": "Nullam Lobortis Quam Limited",
        "description": "egestas@ligula.net",
        "datetime": "2017-03-20 06:31:04"
      },
      {
        "id": 99,
        "creator": "Kibo Sanders",
        "title": "Sit Corp.",
        "description": "ante@hendreritDonecporttitor.co.uk",
        "datetime": "2017-11-23 22:02:06"
      },
      {
        "id": 100,
        "creator": "Ulysses Thornton",
        "title": "In Scelerisque Limited",
        "description": "arcu@NullamnislMaecenas.net",
        "datetime": "2016-10-05 10:14:38"
      }
    ];
    const keys = await this.fireDB.list('/groups/'+key.getKey()+'/transactions');
    trans.forEach(k => keys.push(k));
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
