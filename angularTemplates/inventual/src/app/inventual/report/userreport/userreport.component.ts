import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-userreport',
  templateUrl: './userreport.component.html',
  styleUrls: ['./userreport.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserreportComponent {
//sidebar menu activation start
menuSidebarActive: boolean = false;
myfunction() {
  if (this.menuSidebarActive == false) {
    this.menuSidebarActive = true;
  } else {
    this.menuSidebarActive = false;
  }
}
//sidebar menu activation end
}
