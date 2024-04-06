
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AddProductDialogComponent } from '../add-product-dialog/add-product-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/product.service';
import { Product } from 'src/app/product';
import { ItemEventService } from 'src/app/itemevent.service';
import { ItemService } from 'src/app/item.service';
import { Item } from 'src/app/item';
import { ItemEvent } from 'src/app/itemevent';
import { EventService } from 'src/app/event.service';
import { Event } from 'src/app/event';



@Component({
  selector: 'app-addadjustment',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
  encapsulation: ViewEncapsulation.None
  
})
export class CreateEventComponent implements OnInit {
  
event: Event;

approvedProducts: Product[];
approvedItems: Item[];

//sidebar menu activation start
menuSidebarActive:boolean=false;
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

        const items = this.itemService.getItems(product.id).subscribe(
          (response: Item[]) => {
            const itemsFromProd = response;
            for (let i = 0; i < itemsFromProd.length; i++) {
              const itemEvents = this.itemEventService.getItemEventsByItemID(itemsFromProd[i].id).subscribe(
                (response: ItemEvent[]) => {
                  const itemEventsFromItem = response;
                  for (let j = 0; j < itemEventsFromItem.length; j++) {
                    const event_date = this.eventService.getEventDate(itemEventsFromItem[i].eventID).subscribe(
                      (response: Date) => {
                        var inArray = false;
                        for (var p of this.approvedProducts) {
                          if (product == p) {
                            inArray = true;
                          }
                        }

                        if (this.event.date != response && inArray == false) {
                          this.approvedProducts.push(product);
                          console.log("Approved Product: " + product.id);
                          this.approvedItems.push(itemsFromProd[i]);
                          console.log("Approved Item: " + itemsFromProd[i].id);
                        }
                      },
                      (error: HttpErrorResponse) => {
                        alert(error.message);
                      }
                    );
                  }
                },
                (error: HttpErrorResponse) => {
                  alert(error.message);
                }
              );
            }
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
        

        const existingProduct = this.selectedProducts.find(p => p.product.id === product.id);
        if (existingProduct) {
          existingProduct.quantity += 1; // Or handle as needed
        } else {
          this.selectedProducts.push({ product: product, quantity: 1 });
        }
      });
      // Optionally calculate subtotals here if pricing logic is required
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
  private itemService: ItemService, private eventService: EventService) {}

ngOnInit(): void {}

}
