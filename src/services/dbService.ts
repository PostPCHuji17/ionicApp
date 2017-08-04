

import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "angularfire2/database";

@Injectable()
export class authService {
  constructor(private fireDB: AngularFireDatabase) {

  }

}
