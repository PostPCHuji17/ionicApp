import {Component, Input} from '@angular/core';
import {App, NavController, NavPush, ViewController} from "ionic-angular";
import {TransactionPage} from "../../pages/transaction/transaction";

/**
 * Generated class for the TransactionComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: '[transaction]',
  templateUrl: 'transaction.html'
})
export class TransactionComponent {
  init: boolean = false;
  arrow: string;
  color: string;
  amount: string;
  start: boolean;
  key: string;
  @Input() data: any;

  constructor(private appCtrl : App, public viewCtrl: ViewController) {
  }

  ngAfterContentInit() {
    this.key = this.data.$key;
    this.arrow = this.data.amount > 0 ? 'arrow-up' : 'arrow-down';
    this.color = this.data.amount > 0 ? 'secondary' : 'danger';
    this.start = !(this.data.amount > 0);
    this.amount = '$' + (this.data.amount > 0 ? this.data.amount : this.data.amount * -1);
    this.init = true;
  }

  openTransDialog(){
    console.log('hello');
    try {
      this.appCtrl.getRootNavs()[0].push(TransactionPage, {key : this.key, value : this.data})
    } catch(e){
      console.log(e);
    }
  }

}
