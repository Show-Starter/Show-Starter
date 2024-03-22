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
        this.id = id;
        // Fetch the product details if in edit mode
        this.productService.getById(id).subscribe(
          (product: Product) => {
            this.product = { ...product }; // Spread operator to clone the object
          },
          (error: HttpErrorResponse) => {
            console.error('Error fetching product details:', error.message);
            alert('Failed to load product details.');
          }
        );
      }
    });
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
