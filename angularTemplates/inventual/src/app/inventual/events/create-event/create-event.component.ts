
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AddProductDialogComponent } from '../add-product-dialog/add-product-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-addadjustment',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
  encapsulation: ViewEncapsulation.None
  
})
export class CreateEventComponent implements OnInit {
  
  

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

openAddProductDialog(): void {
  const dialogRef = this.dialog.open(AddProductDialogComponent, {
    width: '250px', // Set your desired width
    // data: {name: this.name, animal: this.animal} // Optional: if you want to pass data to the dialog
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    // Handle your result here
  });
}

//sidebar menu activation end

//counter
counters: { [key: string]: number } = {
  count: 1,
  count1: 1,
  count2: 1,
  count3: 1,
  count4: 1
};

counter(key: string, type: string) {
  if (type === "add") {
    this.counters[key]++;
  } else if (type === "subtract" && this.counters[key] > 1) {
    this.counters[key]--;
  }
}

constructor(public dialog: MatDialog) {}

ngOnInit(): void {}

}
