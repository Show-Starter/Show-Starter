import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Product } from 'src/app/product';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductService } from 'src/app/product.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
}

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductlistComponent implements OnInit {
  public products: Product[] = [];
  public parsedProducts: Product[] = [];
  public searchText: string = '';
  public tasks: Task[] = [];
  public productGroups: string[] = []; // Used for display in dropdown, etc.
  public currentGroupFilter: string = ''; // Holds the current filter for product groups
  public currentPage: number = 1;
  public itemsPerPage: number = 100;
  public allComplete: boolean = false;
  public itemListURL = "http://localhost:4200/products/itemlist?id=";
  public editProductURL = "http://localhost:4200/products/edit-product?id=";

  menuSidebarActive: boolean = false;

  constructor(private productService: ProductService,private router:Router) {}

  ngOnInit(): void {
    this.getProducts();
    
  }

  public task: Task = {
    name: '',
    completed: false,
    color: 'primary'
  };

  public deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        console.log('Product deleted successfully');
        this.refreshProducts(); // Refresh the product list
      },
      error: (error: HttpErrorResponse) => {
        console.error('There was an error!', error);
      }
    });
  }

  

  private extractProductGroups(): void {
    const groups = new Set(this.products.map(p => p.product_group));
    this.productGroups = Array.from(groups);
  }

  public selectProductGroup(group: string): void {
    this.currentGroupFilter = group;
    this.filterProductGroup();
  }
  



  
  public goToEditProduct(productId: number): void {
    this.router.navigateByUrl(`/products/edit-product?id=${productId}`);
  }

  public goToItemList(itemId: number): void {
    this.router.navigateByUrl(`/products/itemlist?id=${itemId}`);
  }

  public filterProductGroup(): void{
    if (this.currentGroupFilter == ''){
      this.initParse();  // If no search text and no group filter, show all products
  } else {
    this.parsedProducts = this.products.filter(product =>
      (this.searchText != '' && (product.name.toLowerCase().includes(this.searchText.toLowerCase()) || product.id.toString().includes(this.searchText))) ||
      (this.currentGroupFilter != '' && product.product_group === this.currentGroupFilter)  // Filter by product group if set
    );
    this.paginateProducts();
  }
}

  public filterProducts(): void {
  


    if (this.searchText == ''){
      this.initParse(); // If no search text, show all products
    }else{
         this.parsedProducts = this.products.filter(product => 
        (product.name != null && product.name.toLowerCase().includes(this.searchText.toLowerCase()))||
         (product.name != null && product.product_group.toLowerCase().includes(this.searchText.toLowerCase()))||
         (product.id.toString().includes(this.searchText)) ||
         product.id == +this.searchText
        
     );
     this.paginateProducts();
     }
 
     this.paginateProducts();
  }

  private paginateProducts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.parsedProducts = this.parsedProducts.slice(startIndex, endIndex);
  }
  
  public onGroupFilterChange(newGroup: string): void {
    this.currentGroupFilter = newGroup;
    this.filterProducts();
  }

  

  
  private refreshProducts(): void {
    this.getProducts(); // Re-fetch the products after deletion
  }

  public getProducts(): void {
   
    this.productService.getProducts().subscribe(
      (response: Product[]) => {
        this.products = response;
        for (let i = 0; i < this.products.length; i++) {
          this.productService.getStockLevel(this.products[i].id).subscribe(
            (response: number) => {
              this.products[i].stock_level = response;
              // console.log("ID: " + this.products[i].id + " Level: " + this.products[i].stock_level);
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            }
          )
        }
        this.initParse();
        this.filterProducts();
        this.extractProductGroups();
        this.filterProductGroup();
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

  public toggleSidebar(): void {
    this.menuSidebarActive = !this.menuSidebarActive;
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

  public myfunction(): void {
    this.menuSidebarActive = !this.menuSidebarActive;
  }

  
}
