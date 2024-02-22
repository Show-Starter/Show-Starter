import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderdiscountComponent } from '../popup/orderdiscount/orderdiscount.component';
import { QuickaddcustomerComponent } from '../popup/quickaddcustomer/quickaddcustomer.component';
import { MakepaymentComponent } from '../popup/makepayment/makepayment.component';

@Component({
  selector: 'app-possale',
  templateUrl: './possale.component.html',
  styleUrls: ['./possale.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PossaleComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  openDialog() {
    const dialogRef = this.dialog.open(OrderdiscountComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogTwo() {
    this.dialog.open(QuickaddcustomerComponent);
  }
  makePayment() {
    this.dialog.open(MakepaymentComponent);
  }
  ngOnInit(): void {}
  
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

  //counter
  counters: { [key: string]: number } = {
    count: 1,
    count1: 1,
  };

  counter(key: string, type: string) {
    if (type === 'add') {
      this.counters[key]++;
    } else if (type === 'subtract' && this.counters[key] > 1) {
      this.counters[key]--;
    }
  }
}
