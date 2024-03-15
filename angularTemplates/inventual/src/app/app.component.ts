import { Component, Renderer2, ElementRef, OnInit } from '@angular/core';
import { Product } from './product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProductService } from './product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Show Starter';

  isRTL = false;

  isSettingsAreaActive = false;

  public static products: Product[];

  toggleSettingsArea() {
    this.isSettingsAreaActive = !this.isSettingsAreaActive;
  }

  constructor(private renderer: Renderer2, private el: ElementRef, private productService: ProductService) {}

  ngOnInit() {
    // Retrieve the direction from local storage on component initialization
    const storedDirection = localStorage.getItem('direction');
    this.isRTL = storedDirection === 'rtl';
    this.setDocumentDirection();
    this.getProducts();
  }

  setDirection(direction: 'rtl' | 'ltr') {
    // Set the direction based on the parameter
    this.isRTL = direction === 'rtl';

    // Save the direction to local storage
    localStorage.setItem('direction', this.isRTL ? 'rtl' : 'ltr');

    // Apply the new direction to the document
    this.setDocumentDirection();
  }

  private setDocumentDirection() {
    const direction = this.isRTL ? 'rtl' : 'ltr';
    this.renderer.setAttribute(this.el.nativeElement.ownerDocument.documentElement, 'dir', direction);
  }

  public getProducts(): void {
    this.productService.getProducts().subscribe(
      (response: Product[]) => {
        AppComponent.products = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
