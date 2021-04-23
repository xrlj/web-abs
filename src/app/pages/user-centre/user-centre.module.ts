import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserCentreComponent} from './user-centre.component';
import {UserCentreRoutingModule} from './user-centre-routing.module';
import {EditorModule} from '@tinymce/tinymce-angular';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [UserCentreComponent],
  imports: [
    CommonModule,
    UserCentreRoutingModule,
    EditorModule,
    FormsModule
  ]
})
export class UserCentreModule { }
