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
interface EventProductMap {
  [key: string]: string[];
  Birthday: string[];
  Convention: string[];
  Wedding: string[];
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
  public selectedEventType: string = '';
  public tasks: Task[] = [];
  public currentPage: number = 1;
  public itemsPerPage: number = 10;
  public allComplete: boolean = false;
  public selectedProducts: Product[] = [];
  public eventProductMap: EventProductMap = {
    'Birthday': [
      "Obey 40 Controller Power Supply",
      "Microphone Stand",
      "Digital Wireless Handheld Microphone System with SM58 Capsule",
      "Quad Mic Kit",
      "Twinkle Lights - Warm White LED 50'- White Wire",
      "Twinkle Light Bar - LED - Warm White",
      "Marquee Letter - H - 36",
      "Marquee Letter - A - 36",
      "Marquee Letter - P - 36",

      "Marquee Letter - P - 36",
      "Marquee Letter - Y - 36",
      "Marquee Letter - B - 36",
      "Marquee Letter - I - 36",
      "Marquee Letter - T - 36",
      "Marquee Letter - H - 36",
      "Marquee Letter - D - 36",
      "Marquee Letter - A - 36",
      "Marquee Letter - Y - 36",

      "DJ System 1"
    ],
    'Convention': [
      "Obey 40 Controller Power Supply",
      "Microphone Stand",
      "Digital Wireless Handheld Microphone System with SM58 Capsule",
      "Quad Mic Kit",
      "DJ System 1",
      "Stage Panel 4ftx8ft",
      "Stage legs 24\""
    ],
    'Wedding': [
      "Obey 40 Controller Power Supply",
      "Microphone Stand",
      "Digital Wireless Handheld Microphone System with SM58 Capsule",
      "Quad Mic Kit",
      "DJ System 1",
      "Stage Panel 4ftx8ft",
      "Stage legs 24\""
    ]
  };


  constructor(private productService: ProductService,
    private MatDialog: MatDialog) {
     
    }

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

  testFunction() {
    console.log('Button clicked!');
}
  //For Curated Events button 

  selectEventType(eventType: string) {
    console.log('Event Type Selected:', eventType);
    if (eventType in this.eventProductMap) {
        this.selectedEventType = eventType;
        this.filterProductsForEvent();
    } else {
        console.error('Invalid event type selected:', eventType);
    }
}
  
filterProductsForEvent() {
  const eventTypeProducts = this.eventProductMap[this.selectedEventType];
  if (!eventTypeProducts) {
      console.error('No products array found for the selected event type:', this.selectedEventType);
      this.parsedProducts = [];
      return;
  }
  this.parsedProducts = this.products.filter(product => 
    eventTypeProducts.some(ep => product.name.toLowerCase().includes(ep.toLowerCase()))
);
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








