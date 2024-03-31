
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AddProductDialogComponent } from '../add-product-dialog/add-product-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/product.service';
import { Product } from 'src/app/product';



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
    width: '1000px',
  });

  dialogRef.afterClosed().subscribe((selectedProducts: Product[]) => {
    if (selectedProducts && selectedProducts.length) {
      console.log('Selected Products:', selectedProducts);
      // Here you can add the selected products to a table or process them as needed
    }
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
