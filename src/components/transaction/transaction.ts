import {Component, Input} from '@angular/core';

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
  init : boolean = false;
  arrow: string;
  color: string;
  amount: string;
  start : boolean;
  @Input() data: any;

  constructor() {
  }

  ngAfterContentInit() {
    this.arrow = this.data.amount > 0? 'arrow-up' : 'arrow-down';
    this.color = this.data.amount > 0? 'secondary' : 'danger';
    this.start = !(this.data.amount > 0);
    this.amount = '$' + (this.data.amount > 0? this.data.amount : this.data.amount*-1);
    this.init = true;
  }

}
