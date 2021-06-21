import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EtpCentreRoutingModule } from './etp-centre-routing.module';
import { EtpInfoComponent } from './etp-info/etp-info.component';
import { EtpBankCardComponent } from './etp-bank-card/etp-bank-card.component';
import {ComponentsModule} from '../../components/components.module';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzDescriptionsModule} from 'ng-zorro-antd/descriptions';
import {DirectivesModule} from '../../directives/directives.module';
import { EtpInfoEditComponent } from './etp-info/etp-info-edit.component';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {ReactiveFormsModule} from '@angular/forms';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzTableModule} from 'ng-zorro-antd/table';
import { EtpBankCardEditComponent } from './etp-bank-card/etp-bank-card-edit.component';
import {NzSelectModule} from 'ng-zorro-antd/select';

/**
 * 企业中心
 */
@NgModule({
  declarations: [EtpInfoComponent, EtpBankCardComponent, EtpInfoEditComponent, EtpBankCardEditComponent],
    imports: [
        CommonModule,
        EtpCentreRoutingModule,
        ComponentsModule,
        NzCardModule,
        NzDescriptionsModule,
        DirectivesModule,
        NzButtonModule,
        ReactiveFormsModule,
        NzFormModule,
        ReactiveFormsModule,
        NzInputModule,
        NzIconModule,
        NzTableModule,
        NzSelectModule
    ]
})
export class EtpCentreModule { }
