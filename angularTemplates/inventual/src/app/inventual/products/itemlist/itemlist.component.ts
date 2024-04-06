import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Item } from 'src/app/item';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ItemService } from 'src/app/item.service';
import { Product } from 'src/app/product';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/event.service';
import { ItemEventService } from 'src/app/itemevent.service';
import { ItemEvent } from 'src/app/itemevent';

interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
}

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ItemlistComponent implements OnInit {
  public items: Item[] = [];
  // public parsedItems: Item[] = [];
  // public searchText: string = '';
  public tasks: Task[] = [];
  public currentPage: number = 1;
  public itemsPerPage: number = 25;
  public allComplete: boolean = false;

  menuSidebarActive: boolean = false;
  parsedItems: Item[];
  public productID: number;
  apiServerUrl = environment.apiBaseUrl;
  productName: String;
  searchText = '';

  constructor(private itemService: ItemService, private http: HttpClient, private itemEventService: ItemEventService,
    private router: Router, private route: ActivatedRoute, private eventService: EventService) {
      this.route.queryParams.subscribe(params => {
        this.productID = params['id'];
        console.log("Product ID: " + this.productID); // Print the parameter to the console. 
      });
    }

  ngOnInit(): void {
    // this.productID = 178;
    // this.productID = +!this.route.snapshot.paramMap.get('id');
    this.getItems();
    this.getProductName(this.productID);
  }

  public task: Task = {
    name: '',
    completed: false,
    color: 'primary'
  };

  public deleteItem(itemId: number): void {
    this.itemService.deleteItem(itemId).subscribe({
      next: () => {
        console.log('Item deleted successfully');
        this.refreshItems(this.productID); // Refresh the item list
      },
      error: (error: HttpErrorResponse) => {
        console.error('There was an error!', error);
      }
    });
  }

  public updateItem(itemId: number): void {
    this.router.navigateByUrl(`/items/additem/${itemId}`);
  }

  public filterItems(): void {
   
    if (this.searchText == '') {
      this.initParse(); // If no search text, show all items
    } else {
      // this.parsedItems = this.items.filter(item =>
      //   (item.name != null && item.name.toLowerCase().includes(this.searchText.toLowerCase())) ||
      //   (item.item_group != null && item.item_group.toLowerCase().includes(this.searchText.toLowerCase())) ||
      //   item.rental_price.toString().includes(this.searchText)
      // );
    }
  }
  
  private refreshItems(productID: number): void {
    this.getItems(); // Re-fetch the items after deletion
  }
  

  

  public getItems(): void {
    this.itemService.getItems(this.productID).subscribe(
      (response: Item[]) => {
        this.items = response;
        console.log("Items Arr Length: " + this.items.length);
        for (let i = 0; i < this.items.length; i++) {
          // console.log("Item i: " + i);
          // this.eventService.getEventDate(this.items[i].eventID).subscribe(
          //   (response: Date) => {
          //     this.items[i].next_date = response.toString();
          //   },
          //   (error: HttpErrorResponse) => {
          //     alert(error.message);
          //   }
          // );

          // this.eventService.getEventName(this.items[i].eventID).subscribe(
          //   (response: String) => {
          //     this.items[i].event_name = response;
          //   },
          //   (error: HttpErrorResponse) => {
          //     alert(error.message);
          //   }
          // );
          // console.log(this.items[i].id);
          this.items[i].item_events = [];

          this.itemEventService.getItemEventsByItemID(this.items[i].id).subscribe(
            (response: ItemEvent[]) => {
              this.items[i].item_events = response;
              console.log(this.items[i].item_events[0].eventID);
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            }
          );

          const event_dates: Date[] = [];

          console.log(this.items[i].item_events[0].eventID);

          if (this.items[i].item_events) {
            for (let j = 0; j < this.items[i].item_events.length; j++) {
              this.eventService.getEventDate(this.items[i].item_events[j].eventID).subscribe(
                (response: Date) => {
                  console.log("Date: " + response);
                  this.items[i].item_events[j].event_date = response;
                  event_dates.push(this.items[i].item_events[j].event_date);
                },
                (error: HttpErrorResponse) => {
                  alert(error.message);
                }
              );

              this.eventService.getEventName(this.items[i].item_events[j].eventID).subscribe(
                (response: String) => {
                  this.items[i].item_events[j].event_name = response;
                },
                (error: HttpErrorResponse) => {
                  alert(error.message);
                }
              );
            }

            var closestDate = this.findClosestDate(event_dates);
            for (let j = 0; j < this.items[i].item_events.length; j++) {
              if (closestDate == this.items[i].item_events[j].event_date) {
                this.items[i].next_date = this.items[i].item_events[j].event_date;
                this.items[i].event_name = this.items[i].item_events[j].event_name;
              }
            }
          }
        }
        this.initParse();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  private initParse(): void {
    this.tasks = [];
    this.parsedItems = [];
    for (let i = 0; i < this.items.length; i++) {
      if (i >= (this.currentPage - 1) * this.itemsPerPage && i < this.currentPage * this.itemsPerPage) {
        this.parsedItems.push(this.items[(this.itemsPerPage * (this.currentPage - 1)) + i]);
      }
    }
  }

  public getProductName(id: number): String {
    this.http.get<Product>(`${this.apiServerUrl}/inventory/find/${id}`).subscribe(
        (response: Product) => {
          console.log("Product Name: " + response.name);
          this.productName = response.name;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );

    return this.productName;
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
    this.parsedItems = [];
    this.initParse();
  }

  public myfunction(): void {
    this.menuSidebarActive = !this.menuSidebarActive;
  }

  public findClosestDate(dates: Date[]): Date | null {
    const targetDate = new Date();

    if (dates.length === 0) return null;

    let closestDate = dates[0];
    let closestDifference = Math.abs(targetDate.getTime() - closestDate.getTime());

    for (let i = 1; i < dates.length; i++) {
        const currentDifference = Math.abs(targetDate.getTime() - dates[i].getTime());
        if (currentDifference < closestDifference) {
            closestDate = dates[i];
            closestDifference = currentDifference;
        }
    }

    return closestDate;
  }
}
