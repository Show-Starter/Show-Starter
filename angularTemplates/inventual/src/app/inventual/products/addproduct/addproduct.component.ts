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
  
  addedProduct: Product;

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

  public addProduct(product: Product): void {
    this.productService.addProduct(product).subscribe(
      (response: Product) => {
        this.addedProduct = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  

}
