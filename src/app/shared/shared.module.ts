import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoaderComponent } from './loader/loader.component';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatDialogModule

  ],
  exports:[HeaderComponent,FooterComponent]
})
export class SharedModule { }
