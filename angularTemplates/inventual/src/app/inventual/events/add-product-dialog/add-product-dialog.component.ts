import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/product.service';
import { Product } from 'src/app/product';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.scss']
})
export class AddProductDialogComponent implements OnInit {

  products: Product[] = [];
  selectedProducts: Product[] = [];

  constructor(private productService: ProductService,
              private MatDialog: MatDialog) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  isSelected(product: Product): boolean {
    return this.selectedProducts.some(selected => selected.id === product.id);
  }
  toggleProductSelection(product: Product, isChecked: boolean): void {
    if (isChecked) {
      this.selectedProducts.push(product);
    } else {
      this.selectedProducts = this.selectedProducts.filter(p => p.id !== product.id);
    }
  }
  


}







