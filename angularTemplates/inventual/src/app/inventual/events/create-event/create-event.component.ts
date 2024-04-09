
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AddProductDialogComponent } from '../add-product-dialog/add-product-dialog.component';
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
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-addadjustment',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
  encapsulation: ViewEncapsulation.None
  
})
export class CreateEventComponent implements OnInit {

  approvedItems: Item[] = [];

  //sidebar menu activation start
  menuSidebarActive:boolean=false;

  event: Event = {
    id: 0,
    name: "",
    location: "",
    type: "",
    date: new Date,
    time: "",
    invoice_num: 0
  };

  myfunction(){
    if(this.menuSidebarActive==false){
      this.menuSidebarActive=true;
    }
    else {
      this.menuSidebarActive=false;
    }
  }

  openAddProductDialog(): void {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '1000px',
    });

    dialogRef.afterClosed().subscribe((selectedProducts: Product[]) => {
      
      if (selectedProducts && selectedProducts.length) {
        this.selectedProducts = selectedProducts.map(product => ({
          product: product,
          quantity: 1, // Default quantity can be set to 1 or any logic you have
        }));
        selectedProducts.forEach(product => {
          let items: Item[] = [];
        
          this.getItems(product.id).subscribe(
            (response: Item[]) => {
              items = response;
        
              console.log("items length: " + items.length);
        
              items.forEach(item => {
                console.log("In Item For Loop");
        
                let itemEvents: ItemEvent[] = [];
        
                this.getItemEvents(item.id).subscribe(
                  (response: ItemEvent[]) => {
                    itemEvents = response;
        
                    if (!itemEvents.length) {
                      this.approvedItems.push(item);
                    }
        
                    itemEvents.forEach(itemEvent => {
                      this.getEventDate(itemEvent.eventID).subscribe(
                        (response: Date) =>{
                          const date: Date = response;
        
                          const datepipe: DatePipe = new DatePipe('en-US');
                          const newEventDate = datepipe.transform(this.event.date, 'yyyy-MM-dd');
                          const itemEventDate = datepipe.transform(date, 'yyyy-MM-dd');
        
                          const dateComp = newEventDate === itemEventDate;
                          console.log(dateComp);
        
                          if (!dateComp && !this.checkIfInApproved(item)) {
                            this.approvedItems.push(item);
                            console.log("Item " + item.id + " Added to Approve");
                          }
                        },
                        (error: HttpErrorResponse) => {
                          alert(error.message);
                        }
                      );
                    });
                  },
                  (error: HttpErrorResponse) => {
                    alert(error.message);
                  }
                );
              });
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            }
          );
          
        });

      }

      this.selectedProducts = selectedProducts.map(product => ({
          product: product,
          quantity: 1, // Default quantity can be set to 1 or any logic you have
      }));
    });
    
  }

  selectedProducts: Array<{
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
    let item = this.selectedProducts[index];
    if (type === 'add') {
      item.quantity++;
    } else if (type === 'subtract' && item.quantity > 1) {
      item.quantity--;
    }
  }

  removeProduct(index: number) {
    this.selectedProducts.splice(index, 1);
  }

  constructor(public dialog: MatDialog, private itemEventService: ItemEventService,
    private itemService: ItemService, private eventService: EventService, private router: Router) {}

  ngOnInit(): void {}

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

  getItemEvents(itemID: number): Observable<ItemEvent[]> {
    return new Observable<ItemEvent[]>((observer) => {
      var itemEvents: ItemEvent[] = [];

      this.itemEventService.getItemEventsByItemID(itemID).subscribe(
        (response: ItemEvent[]) => {
          itemEvents = response;
          observer.next(itemEvents);
          observer.complete();
        },
        (error: HttpErrorResponse) => {
          observer.error(error.message);
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

  checkIfInApproved(item: Item): Boolean {
    var inApproved = false;

    this.approvedItems.forEach(approvedItem => {
      if (approvedItem.id == item.id) {
        inApproved = true;
      }
    });

    return inApproved;
  }

  getProductTotalAvailable(productID: number): number {
    var numberAvailable = 0;

    this.approvedItems.forEach(approvedItem => {
      if (approvedItem.productID == productID) {
        numberAvailable++;
      };
    });

    return numberAvailable;
  }

  addEvent(): void {
    let isQuantityValid = true;
  
    this.selectedProducts.forEach(product => {
      const available = this.getProductTotalAvailable(product.product.id);
      if (product.quantity > available) {
        isQuantityValid = false;
        this.dialog.open(CustomMessageDialogComponent, {
          width: '400px',
          data: { title: 'Error', message: `You have too many of the product ${product.product.name}s added. Available: ${available}` }
        });
        return; // Break the forEach loop
      }
    });
  
    if (!isQuantityValid) {
      return; // Stop the event addition if any quantity is invalid
    }

    this.eventService.addEvent(this.event).subscribe(
      (response) => {
        console.log('Event added', response);
        // Handle post-add logic here
      },
      (error) => {
        // Handle error
        console.error('Error adding Event:', error);
      }
    );

    this.router.navigate(['/events/eventlist']);
  }


}
