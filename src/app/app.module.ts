import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { ViewsModule } from './views/views.module';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoaderComponent } from './shared/loader/loader.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment.development';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ViewsModule,
    SharedModule,
    HttpClientModule,
    ],
  providers: [
    MatSnackBar,
    {
      provide: MatDialogRef,
      useValue: {}
    },
    { provide: MAT_DIALOG_DATA, useValue: {} }, // <== I had to add this too
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
