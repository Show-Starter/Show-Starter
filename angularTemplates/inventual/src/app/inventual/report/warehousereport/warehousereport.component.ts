import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-warehousereport',
  templateUrl: './warehousereport.component.html',
  styleUrls: ['./warehousereport.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WarehousereportComponent {
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
