import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/product.service';
import { Product } from 'src/app/product';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ThemePalette } from '@angular/material/core';

interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
}

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.scss']
})
export class AddProductDialogComponent implements OnInit {

  public products: Product[] = [];
  
  public parsedProducts: Product[] = [];
  public searchText: string = '';
  public tasks: Task[] = [];
  public currentPage: number = 1;
  public itemsPerPage: number = 10;
  public allComplete: boolean = false;
  public selectedProducts: Product[] = [];

  constructor(private productService: ProductService,
              private MatDialog: MatDialog) { }

  ngOnInit(): void {
    this.getProducts();
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }
  public task: Task = {
    name: '',
    completed: false,
    color: 'primary'
  };

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
  
  public filterProducts(): void {
   
    if (this.searchText == '') {
      this.initParse(); // If no search text, show all products
    } else {
      this.parsedProducts = this.products.filter(product =>
        (product.name != null && product.name.toLowerCase().includes(this.searchText.toLowerCase())) ||
        (product.product_group != null && product.product_group.toLowerCase().includes(this.searchText.toLowerCase())) ||
        (product.rental_price.toString().includes(this.searchText)) ||
        product.id == +this.searchText
      );
    }
  }
  
  private refreshProducts(): void {
    this.getProducts(); // Re-fetch the products after deletion
  }

  public getProducts(): void {
    this.productService.getProducts().subscribe(
      (response: Product[]) => {
        this.products = response;
        // for (let i = 0; i < this.products.length; i++) {
        //   this.productService.getStockLevel(this.products[i].id).subscribe(
        //     (response: number) => {
        //       this.products[i].stock_level = response;
        //       // console.log("ID: " + this.products[i].id + " Level: " + this.products[i].stock_level);
        //     },
        //     (error: HttpErrorResponse) => {
        //       alert(error.message);
        //     }
        //   )
        // }
        this.initParse();
        this.filterProducts();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  private initParse(): void {
    this.tasks = [];
    this.parsedProducts = [];
    for (let i = 0; i < this.products.length; i++) {
      if (i >= (this.currentPage - 1) * this.itemsPerPage && i < this.currentPage * this.itemsPerPage) {
        this.parsedProducts.push(this.products[(this.itemsPerPage * (this.currentPage - 1)) + i]);
      }
    }
  }



  public updateAllComplete(): void {
    this.allComplete = this.tasks.every(task => task.completed);
  }

  public someComplete(): boolean {
    return this.tasks.some(task => task.completed) && !this.allComplete;
  }

  public setAll(completed: boolean): void {
    this.allComplete = completed;
    this.tasks.forEach(task => task.completed = completed);
  }

  public setSingleCheck(index: number, completed: boolean): void {
    this.tasks[index].completed = completed;
    this.updateAllComplete();
  }

  public onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.parsedProducts = [];
    this.initParse();
  }




}








