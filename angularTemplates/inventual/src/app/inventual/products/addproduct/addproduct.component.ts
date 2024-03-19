import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Product } from 'src/app/product'; // Ensure this path is correct
import { ProductService } from 'src/app/product.service'; // Ensure this path is correct
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddproductComponent implements OnInit {
  @Input() editProduct: Product | null = null;

  product: Product = {
    id: 0,
    name: '',
    rental_price: 0,
    product_group: '',
    eventID: 0,
    productCode: '',
    stock_method: ''

    // Initialize other properties as necessary
  };
  // Assuming 'menuSidebarActive' is for unrelated sidebar logic
  menuSidebarActive: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    if (this.editProduct) {
      // We're in edit mode, populate the form
      this.product = { ...this.editProduct };
    }
    // Else, it's add mode, and 'product' is already initialized
  }


  saveProduct() {
    if (this.editProduct) {
      // Edit mode logic here
      // Call the ProductService method to update an existing product
      // Example:
      // this.productService.updateProduct(this.product.id, this.product).subscribe(...)
    } else {
      // Add mode logic
      this.productService.addProduct(this.product).subscribe(
        (response: Product) => {
          console.log('Product added', response);
          // Optionally redirect the user or clear the form
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }

  myfunction() {
    this.menuSidebarActive = !this.menuSidebarActive; // Simplified toggle logic
  }
}
