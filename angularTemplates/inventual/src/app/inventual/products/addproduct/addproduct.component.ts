import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Product } from 'src/app/product'; // Ensure this path is correct
import { ProductService } from 'src/app/product.service'; // Ensure this path is correct
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';

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

  public id: number;
  public isEdit: boolean = false;
  constructor(private productService: ProductService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = +params['id']; // Convert to number
      if (id) {
        this.isEdit = true;
        console.log(this.isEdit);
        // Fetch the product details and populate the form
      }
    });
  }


  saveProduct() {
    if (this.isEdit) {
      // Call the ProductService to update an existing product
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
    } else {
      // Call the ProductService to add a new product
      this.productService.addProduct(this.product).subscribe(
        (response) => {
          console.log('Product added', response);
          // Handle post-add logic here
        },
        (error) => {
          // Handle error
          console.error('Error adding product:', error);
        }
      );
    }
  }

  myfunction() {
    this.menuSidebarActive = !this.menuSidebarActive; // Simplified toggle logic
  }
}
