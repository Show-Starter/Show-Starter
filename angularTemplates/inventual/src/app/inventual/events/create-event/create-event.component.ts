
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
          let gotItems = false;

          // console.log(product.id);
          
          let items: Item[] = [];
          

          this.itemService.getItems(product.id).subscribe(
            (response: Item[]) => {
              items = response;
            },
            (error: HttpErrorResponse) => {
              items = [];
            }
          );

          setTimeout(() => {
          
            items.forEach(item => {

              let gotItemEvents = false;

              let itemEvents: ItemEvent[] = [];

              this.itemEventService.getItemEventsByItemID(item.id).subscribe(
                (response: ItemEvent[]) => {
                  itemEvents = response;
                  gotItemEvents = true;
                },
                (error: HttpErrorResponse) => {
                  itemEvents = [];
                  gotItemEvents = true;
                }
              );
              
              setTimeout(() => {

                if (!itemEvents.length) {
                  this.approvedItems.push(item);
                }

                itemEvents.forEach(itemEvent => {

                  setTimeout(() => {
                    var date: Date = new Date;
                    
                    this.eventService.getEventDate(itemEvent.eventID).subscribe(
                      (response: Date) => {
                        date = response;
                        console.log("Returned Date: " + date);
                      },
                      (error: HttpErrorResponse) => {
                        alert(error.message);
                      }
                    );

                    setTimeout(() => {

                      const datepipe: DatePipe = new DatePipe('en-US');
                      var newEventDate = datepipe.transform(this.event.date, 'YYYY-MM-dd');
                      console.log("newEventDate: " + newEventDate);
                      var itemEventDate = datepipe.transform(date, 'YYYY-MM-dd');
                      console.log("itemEventDate: " + itemEventDate);

                      const dateComp = newEventDate === itemEventDate
                      console.log(dateComp);

                      if (!dateComp && !this.checkIfInApproved(item)) {
                        this.approvedItems.push(item);
                        console.log("ITEM ADDED");
                      }

                    }, 1500)
                  }, 1500);
                });
              }, 1500);
            });
          }, 2000);
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
    private itemService: ItemService, private eventService: EventService) {}

  ngOnInit(): void {}

  getItems(productID: number): Item[] {
    var items: Item[] = [];

    this.itemService.getItems(productID).subscribe(
      (response: Item[]) => {
        items = response;
        console.log("Items length: " + items.length);
        return items;
      },
      (error: HttpErrorResponse) => {
        return null;
      }
    );

    return items;
  }

  getItemEvents(itemID: number): ItemEvent[] {
    var itemEvents: ItemEvent[] = [];

    this.itemEventService.getItemEventsByItemID(itemID).subscribe(
      (response: ItemEvent[]) => {
        itemEvents = response;
      },
      (error: HttpErrorResponse) => {
        return null;
      }
    );

    return itemEvents;
  }

  getEventDate(eventID: number): Date {
    var date: Date = new Date;

    this.eventService.getEventDate(eventID).subscribe(
      (response: Date) => {
        date = response;
      },
      (error: HttpErrorResponse) => {
        return null;
      }
    );

    return date;
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

  getProductTotalAvailable(productID: number): Number {
    var numberAvailable = 0;

    this.approvedItems.forEach(approvedItem => {
      if (approvedItem.productID == productID) {
        numberAvailable++;
      };
    });

    return numberAvailable;
  }

}
