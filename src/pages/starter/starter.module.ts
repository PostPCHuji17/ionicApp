import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StarterPage } from './starter';

@NgModule({
  declarations: [
    StarterPage,
  ],
  imports: [
    IonicPageModule.forChild(StarterPage),
  ],
  exports: [
    StarterPage
  ]
})
export class StarterPageModule {}
