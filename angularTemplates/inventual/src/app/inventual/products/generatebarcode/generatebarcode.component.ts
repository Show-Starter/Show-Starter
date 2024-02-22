import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-generatebarcode',
  templateUrl: './generatebarcode.component.html',
  styleUrls: ['./generatebarcode.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GeneratebarcodeComponent implements OnInit {
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

  //counter=
  counters: { [key: string]: number } = {
    count: 1,
  };

  counter(key: string, type: string) {
    if (type === 'add') {
      this.counters[key]++;
    } else if (type === 'subtract' && this.counters[key] > 1) {
      this.counters[key]--;
    }
  }

  constructor() {}

  ngOnInit(): void {}
}
