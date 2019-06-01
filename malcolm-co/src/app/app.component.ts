import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'Malcolm & Co';
  admin = true;

  toggleManager(): void{
    this.admin = !this.admin;
  }


}
