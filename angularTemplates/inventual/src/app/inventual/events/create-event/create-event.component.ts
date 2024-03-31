
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
      selectedProducts.forEach(product => {
        const existingProduct = this.selectedProducts.find(p => p.product.id === product.id);
        if (existingProduct) {
          existingProduct.quantity += 1; // Or handle as needed
        } else {
          this.selectedProducts.push({ product: product, quantity: 1 });
        }
      });
      // Optionally calculate subtotals here if pricing logic is required
    }
  });
}

selectedProducts: Array<{
  product: Product,
  quantity: number,
  subtotal?: number
}> = [];

//sidebar menu activation end

//counter
counters: { [key: string]: number } = {
  count: 1,
  count1: 1,
  count2: 1,
  count3: 1,
  count4: 1
};

counter(index: number, type: string) {
  let item = this.selectedProducts[index];
  if (type === 'add') {
    item.quantity++;
  } else if (type === 'subtract' && item.quantity > 1) {
    item.quantity--;
  }
}

removeProduct(index: number) {
  this.selectedProducts.splice(index, 1);
}

constructor(public dialog: MatDialog) {}

ngOnInit(): void {}

}
