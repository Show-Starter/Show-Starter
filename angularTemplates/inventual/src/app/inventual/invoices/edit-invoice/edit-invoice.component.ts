
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ProductService } from 'src/app/product.service';
import { Product } from 'src/app/product';
import { Item } from 'src/app/item';
import { ItemEvent } from 'src/app/itemevent';
import { ItemService } from 'src/app/item.service';
import { EventService } from 'src/app/event.service';
import { ItemEventService } from 'src/app/itemevent.service';
import { MatDialog } from '@angular/material/dialog';
import { Event } from 'src/app/event';
import { DatePipe } from '@angular/common';
import { CustomMessageDialogComponent } from '../../custom-message-dialog/custom-message-dialog.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, catchError, forkJoin, map, mergeMap, of, switchMap, throwError } from 'rxjs';
import { Invoice } from 'src/app/invoice';
import { InvoiceService } from 'src/app/invoice.service';
import { FindEventDialogComponent } from '../find-event-dialog/find-event-dialog.component';
import { EditEventComponent } from '../../events/edit-event/edit-event.component';


@Component({
  selector: 'app-addadjustment',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class EditInvoiceComponent implements OnInit {

  approvedItems: Item[] = [];

  //sidebar menu activation start
  menuSidebarActive: boolean = false;

  event: Event;

  constructor(public dialog: MatDialog, private itemEventService: ItemEventService, private invoiceService: InvoiceService,
    private itemService: ItemService, private eventService: EventService, private router: Router, private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.invoice.id = params['id'];
    });

    this.getInvoice();
  }

  myfunction() {
    if (this.menuSidebarActive == false) {
      this.menuSidebarActive = true;
    }
    else {
      this.menuSidebarActive = false;
    }
  }

  invoice: Invoice = {
    id: 0,
    first_name: "",
    last_name: "",
    bill_add: "",
    bill_city: "",
    bill_state: "",
    card_num: 0,
    exp_date: "",
    amount: 0,
    event_id: 0,
    event_name: ""
  }

  eventProducts: Array<{
    product: Product,
    quantity: number,
    subtotal?: number
  }> = [];

  //sidebar menu activation end

  //counter
  counters: { [key: string]: number } = {
    count: 1,
    count1: 1,
    count2: 1,
    count3: 1,
    count4: 1
  };

  counter(index: number, type: string) {
    let item = this.eventProducts[index];
    if (type === 'add') {
      item.quantity++;
    } else if (type === 'subtract' && item.quantity > 1) {
      item.quantity--;
    }
  }

  async getInvoice() {
    const invoice = await this.invoiceService.getInvoice(this.invoice.id).toPromise();

    if (invoice) {
      this.invoice = invoice;
    }

    this.getEvent();
  }

  async getEvent() {
    const event = await this.eventService.getById(this.invoice.event_id).toPromise();

    if (event) {
      this.event = event;
    }
  }

  async addInvoice() {
    const newInvoice = await this.invoiceService.addInvoice(this.invoice).toPromise();

    setTimeout(async () => {
      if (newInvoice) {
        this.event.invoice_num = newInvoice.id;

        await this.eventService.updateEvent(this.event).toPromise();
      }
    }, 1500);
  }

  getItems(productID: number): Observable<Item[]> {
    return new Observable<Item[]>((observer) => {
      var items: Item[] = [];
      this.itemService.getItems(productID).subscribe(
        (response: Item[]) => {
          items = response;

          console.log("Items length: " + items.length);

          observer.next(items);
          observer.complete();
        },
        (error: HttpErrorResponse) => {
          observer.error(error.message);
        }
      );
    });
  }

  openFindEventDialog(): void {
    const dialogRef = this.dialog.open(FindEventDialogComponent, {
      width: '1000px',
    });

    dialogRef.afterClosed().subscribe(async (selectedEvents: Event[]) => {

      if (selectedEvents) {
        this.event = selectedEvents[0];
      }

      const products = await this.getEventProductsFromEventID(this.event.id).toPromise();

      if (products) {

        products.forEach(async product => {

          const productQuantity = await this.getProductQuantity(product.id).toPromise();

          if (productQuantity)  {
            this.invoice.amount += productQuantity * product.rental_price;
          }
        })
      }
    });
  }

  getEventProductsFromEventID(eventID: number): Observable<Product[]> {
    let itemEvents: ItemEvent[];
    let products: Product[] = [];
  
    return this.getItemEventsByEventID(eventID).pipe(
      mergeMap((response: ItemEvent[]) => {
        itemEvents = response;
        const observables: Observable<Product>[] = [];
  
        itemEvents.forEach(itemEvent => {
          observables.push(
            this.getItemByItemID(itemEvent.itemID).pipe(
              mergeMap((item: Item) => {
                const productID = item.productID;
                return this.getProductByProductID(productID).pipe(
                  catchError((error: any) => {
                    console.error('Error fetching product:', error);
                    // Return a default product or throw the error
                    return of({} as Product); // Example: Return an empty product
                    // OR
                    // return throwError(error); // Rethrow the error
                  })
                );
              })
            )
          );
        });
  
        return forkJoin(observables);
      }),
      catchError((error: any) => {
        console.error('Error fetching item events:', error);
        // Propagate the error or return a default value
        return throwError(error); // Example: Propagate the error
        // OR
        // return of([]); // Example: Return an empty array
      })
    );
  }

  getProductByProductID(productID: number): Observable<Product> {
    return new Observable<Product>((observer) => {
      let product: Product;

      this.productService.getById(productID).subscribe(
        (response: Product) => {
          product = response;
          observer.next(product);
          observer.complete();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }

      );

    });

  }

  getEventDate(eventID: number): Observable<Date> {
    return new Observable<Date>((observer) => {
      let eventDate: Date = new Date;

      this.eventService.getEventDate(eventID).subscribe(
        (response: Date) => {
          eventDate = response;
          observer.next(eventDate);
          observer.complete();
        },
        (error: HttpErrorResponse) => {
          observer.error(error.message);
        }
      );
    });
  }

  getItemEventsByEventID(eventID: number): Observable<ItemEvent[]> {
    return new Observable<ItemEvent[]>((observer) => {
      let itemEvents: ItemEvent[] = [];

      this.itemEventService.getItemEventsByEventID(eventID).subscribe(
        (response: ItemEvent[]) => {
          itemEvents = response;
          observer.next(itemEvents);
          observer.complete();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    });
  }

  getItemByItemID(itemID: number): Observable<Item> {
    return new Observable<Item>((observer) => {
      let item: Item;

      this.itemService.getById(itemID).subscribe(
        (response: Item) => {
          item = response;
          observer.next(item);
          observer.complete();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }

      );

    });
  }

  getProductQuantity(productID: number): Observable<number> {
    let quantity = 0;
    const itemIDsSet = new Set<number>();

    return this.getItemEventsByEventID(this.event.id).pipe(
      switchMap((itemEvents: ItemEvent[]) => {
        const itemObservables = itemEvents.map(itemEvent => {
          return this.getItemByItemID(itemEvent.itemID).pipe(
            map((item: Item) => ({ item, itemEvent }))
          );
        });
        return forkJoin(itemObservables);
      }),
      map((responses: { item: Item, itemEvent: ItemEvent }[]) => {
        responses.forEach(response => {
          const currentItemID = response.itemEvent.itemID;
          if (!itemIDsSet.has(currentItemID) && response.item.productID === productID) {
            quantity++;
            itemIDsSet.add(currentItemID);
          }
        });
        return quantity;
      }),
      catchError((error: HttpErrorResponse) => {
        alert(error.message);
        return throwError(error);
      })
    );
  }

  async updateInvoice(){
    await this.invoiceService.updateInvoice(this.invoice).toPromise()
    this.router.navigate(['/invoices/invoicelist']);
  }


}
