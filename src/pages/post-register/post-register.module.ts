import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostRegisterPage } from './post-register';

@NgModule({
  declarations: [
    PostRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(PostRegisterPage),
  ],
  exports: [
    PostRegisterPage
  ]
})
export class PostRegisterPageModule {}
