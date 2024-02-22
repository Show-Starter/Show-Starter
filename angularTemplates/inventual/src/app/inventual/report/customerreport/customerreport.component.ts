import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-customerreport',
  templateUrl: './customerreport.component.html',
  styleUrls: ['./customerreport.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomerreportComponent {
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
