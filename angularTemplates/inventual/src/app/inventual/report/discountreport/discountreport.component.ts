import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-discountreport',
  templateUrl: './discountreport.component.html',
  styleUrls: ['./discountreport.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DiscountreportComponent implements OnInit {
//sidebar menu activation start
menuSidebarActive:boolean=false;
myfunction(){
  if(this.menuSidebarActive==false){
    this.menuSidebarActive=true;
  }
  else {
    this.menuSidebarActive=false;
  }
}
//sidebar menu activation end

  constructor() { }

  ngOnInit(): void {
  }

}
