
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
import { Observable, catchError, forkJoin, map, switchMap, throwError } from 'rxjs';


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
        
        selectedProducts.forEach(product => {

          let selectedProduct = {
            product: product,
            quantity: 1, // Default quantity can be set to 1 or any logic you have
          };

          this.selectedProducts.push(selectedProduct);

          console.log("this.selectedProducts.length = " + this.selectedProducts.length);

          let items: Item[] = [];
        
          this.getItems(product.id).subscribe(
            (response: Item[]) => {
              items = response;
        
              items.forEach(item => {
        
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
        
                          if (!dateComp && !this.checkIfInApproved(item)) {
                            this.approvedItems.push(item);
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

    let eventID: number = 0;
  
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

    console.log("ADDING EVENT");
    this.eventService.addEvent(this.event).subscribe(
      (response) => {
        console.log('Event added', response);
        eventID = response.id;
        console.log(eventID);
        // Handle post-add logic here
      },
      (error) => {
        // Handle error
        console.error('Error adding Event:', error);
      }
    );

    setTimeout(() => {
      this.event.id = eventID;

      this.updateEvent();
    }, 1500);
    
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

  async updateEvent(): Promise<void> {
    console.log(this.event.id);

    let isQuantityValid = true;

    for (const obj of this.selectedProducts) {
        const available = this.getProductTotalAvailable(obj.product.id);
        if (obj.quantity > available) {
            isQuantityValid = false;
            this.dialog.open(CustomMessageDialogComponent, {
                width: '400px',
                data: { title: 'Error', message: `You have too many of the product ${obj.product.name}s added. Available: ${available}` }
            });
            return; // Stop the event addition if any quantity is invalid
        }

        let productQuantity: number | undefined;
        try {
            productQuantity = await this.getProductQuantity(obj.product.id).toPromise();

            console.log("productQuantity = " + productQuantity);
        } catch (error) {
            console.error('Error fetching product quantity:', error);
            this.dialog.open(CustomMessageDialogComponent, {
                width: '400px',
                data: { title: 'Error', message: `Error fetching product quantity for ${obj.product.name}. Please try again.` }
            });
            return; // Stop the event addition if there's an error fetching quantity
        }

        let items: Item[] | undefined;
        try {
            items = await this.getItems(obj.product.id).toPromise();
        } catch (error) {
            console.error('Error fetching product quantity:', error);
            this.dialog.open(CustomMessageDialogComponent, {
                width: '400px',
                data: { title: 'Error', message: `Error fetching product quantity for ${obj.product.name}. Please try again.` }
            });
            return; // Stop the event addition if there's an error fetching quantity
        }

        if (productQuantity == 0 || productQuantity == undefined) {
          let amountAdded = 0;

          if(items) {
            items.forEach(item => {
              if (amountAdded < obj.quantity) {
                const newItemEvent: ItemEvent = {
                  id: 0,
                  itemID: item.id,
                  eventID: this.event.id
                }
                this.itemEventService.addItemEvent(newItemEvent).toPromise();
                amountAdded++;
              }
            })
          }
        } else if (productQuantity !== undefined && productQuantity !== obj.quantity) {
            // items removed
            if (productQuantity > obj.quantity) {
              console.log("ITEMS REMOVED");
              let removeAmount = productQuantity - obj.quantity;
              let amountRemoved = 0;

              if (items) {

                items.forEach(async item => {

                  let itemEvents: ItemEvent[] | undefined;
                  try {
                      itemEvents = await this.getItemEvents(item.id).toPromise();
                  } catch (error) {
                      console.error('Error fetching product quantity:', error);
                      this.dialog.open(CustomMessageDialogComponent, {
                          width: '400px',
                          data: { title: 'Error', message: `Error fetching product quantity for ${obj.product.name}. Please try again.` }
                      });
                      return; // Stop the event addition if there's an error fetching quantity
                  }

                  if (itemEvents) {
                    itemEvents.forEach(itemEvent => {
                      if (itemEvent.eventID == this.event.id && amountRemoved < removeAmount) {
                        this.itemEventService.deleteItemEvent(itemEvent.id).toPromise();
                        amountRemoved++;
                      }
                    });
                  }
                })
              }

            // items added
            } else if (productQuantity < obj.quantity) {
                // Added quantity logic
              console.log("ITEMS ADDED");
              let addAmount = obj.quantity - productQuantity;
              let amountAdded = 0;

              if (items) {

                items.forEach(async item => {

                  let itemEvents: ItemEvent[] | undefined;
                  try {
                      itemEvents = await this.getItemEvents(item.id).toPromise();
                  } catch (error) {
                      console.error('Error fetching product quantity:', error);
                      this.dialog.open(CustomMessageDialogComponent, {
                          width: '400px',
                          data: { title: 'Error', message: `Error fetching product quantity for ${obj.product.name}. Please try again.` }
                      });
                      return; // Stop the event addition if there's an error fetching quantity
                  }

                  if (itemEvents) {
                    let itemAdded = false;

                    itemEvents.forEach(itemEvent => {
                      if (itemEvent.eventID == this.event.id) {
                        itemAdded = true;
                      }
                    });

                    if (!itemAdded && amountAdded < addAmount) {
                      let newItemEvent: ItemEvent = {
                            id: 0,
                            itemID: item.id,
                            eventID: this.event.id
                      }
                      this.itemEventService.addItemEvent(newItemEvent).toPromise();
                      amountAdded++;
                    }

                  }
                })
              }
            }
        }
    }

    if (!isQuantityValid) {
        return; // Stop the event addition if any quantity is invalid
    }

    this.router.navigate(['/events/eventlist']);
  }


}
