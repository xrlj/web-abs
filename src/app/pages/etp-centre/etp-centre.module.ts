import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EtpCentreRoutingModule } from './etp-centre-routing.module';
import { EtpInfoComponent } from './etp-info/etp-info.component';
import { EtpBankCardComponent } from './etp-bank-card/etp-bank-card.component';

/**
 * 企业中心
 */
@NgModule({
  declarations: [EtpInfoComponent, EtpBankCardComponent],
  imports: [
    CommonModule,
    EtpCentreRoutingModule
  ]
})
export class EtpCentreModule { }
