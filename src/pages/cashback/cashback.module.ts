import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CashbackPage } from './cashback';

@NgModule({
  declarations: [
    CashbackPage,
  ],
  imports: [
    IonicPageModule.forChild(CashbackPage),
  ],
})
export class CashbackPageModule {}
