import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-mashwara';

  version: any = 0;
  increaseVer(){
    this.version += 1
  }
}
