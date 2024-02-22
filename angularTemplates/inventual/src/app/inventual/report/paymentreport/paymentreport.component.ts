import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-paymentreport',
  templateUrl: './paymentreport.component.html',
  styleUrls: ['./paymentreport.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentreportComponent implements OnInit {
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

  constructor() {}

  ngOnInit(): void {}

}
