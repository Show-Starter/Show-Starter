import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  productID: number;
  menuSidebarActive: boolean = false;
  name: String;
  product_group: string;
  stock_method: string;
  rental_price: number;

  product: Product = {
    id: 0,
    name: '',
    rental_price: 0,
    product_group: '',
    stock_method: '',
    stock_level: 0,
  };

  constructor(private productService: ProductService, private http: HttpClient, 
    private router: Router, private route: ActivatedRoute) {
      this.route.queryParams.subscribe(params => {
        this.productID = params['id'];
        console.log("Product ID: " + this.productID); // Print the parameter to the console. 
      });
    }

  ngOnInit(): void {
    this.getProduct(this.productID);
  }

  public getProduct(productID: number) {
    this.productService.getById(productID).subscribe(
      (response: Product) => {
        this.product = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public saveProduct() {
    this.productService.getStockLevel(this.product.id).subscribe(
      (response: number) => {
        this.product.stock_level = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )

    this.productService.updateProduct(this.product).subscribe(
      (response) => {
        console.log('Product updated', response);
        // Handle post-update logic here, like redirecting to the product list
      },
      (error) => {
        // Handle error
        console.error('Error updating product:', error);
      }
    );
  }

  myfunction() {
    this.menuSidebarActive = !this.menuSidebarActive; // Simplified toggle logic
  }

}
