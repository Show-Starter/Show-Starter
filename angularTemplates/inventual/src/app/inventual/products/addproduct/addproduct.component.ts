import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddproductComponent implements OnInit {
  //sidebar menu activation start
  menuSidebarActive:boolean=false;

  newProduct: Product = {
    // Initialize all required properties of Product here
    name: '',
    rental_price: 0,
    id: 0,
    product_group: '',
    stock_method: '',
    eventID: 0,
    productCode: ''
  };
  
  
  addedProduct: Product;

  public addProduct(): void {
    this.productService.addProduct(this.newProduct).subscribe(
      (response: Product) => {
        console.log('Product added', response);
        // Optionally redirect the user or clear the form
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  myfunction(){
    if(this.menuSidebarActive==false){
      this.menuSidebarActive=true;
    }
    else {
      this.menuSidebarActive=false;
    }
  }
  //sidebar menu activation end

  constructor(private productService: ProductService) {}

  ngOnInit(): void {}


  

}
