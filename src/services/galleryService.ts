import {Injectable} from "@angular/core";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {LoadingController, Loading, ToastController, Platform} from "ionic-angular";
import {Observable} from "rxjs/Observable";
import {dbServices} from "./dbService";
import {authService} from "./authService";
import Group = myHome.object.Group;
import Transaction = myHome.object.Transaction;

@Injectable()
export class galleryService {
  constructor(private db : dbServices, private auth : authService, private camera : Camera) {

  }

  async takePhoto(key : string, load : Loading){
    let options = {
      destinationType : this.camera.DestinationType.DATA_URL,
      quality : 50,
      sourceType : this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    } as CameraOptions;
    try{
      const photo = await this.camera.getPicture(options);
      load.present();
      await this.db.addPictureToTransaction(photo, key);
      load.dismiss();
      return photo;
    } catch(e){
      console.error(e);
      alert(e);
    }
  }
}
