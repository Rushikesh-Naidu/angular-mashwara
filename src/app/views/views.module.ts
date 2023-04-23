import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewsRoutingModule } from './views-routing.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { NgOtpInputModule } from 'ng-otp-input';
import {MatIconModule} from '@angular/material/icon';
import { RegisterUserComponent } from './register-user/register-user.component';
import {MatDatepickerModule} from '@angular/material/datepicker';


@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    RegisterUserComponent
  ],
  imports: [
    CommonModule,
    ViewsRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgOtpInputModule,
    SharedModule,
    MatIconModule,
    MatDatepickerModule
  ]
})
export class ViewsModule { }
