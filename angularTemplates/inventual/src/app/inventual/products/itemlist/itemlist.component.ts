import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Item } from 'src/app/item';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ItemService } from 'src/app/item.service';
import { Product } from 'src/app/product';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/event.service';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { ItemEvent } from 'src/app/itemevent';
import { ItemEventService } from 'src/app/itemevent.service';

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
  items: Item[] = [];
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
    this.main();
    this.getProductName(this.productID);
  }

  public task: Task = {
    name: '',
    completed: false,
    color: 'primary'
  };

  getItems(): Observable<Item[]> {
    return new Observable<Item[]>((observer) => {
      var items: Item[] = [];
      this.itemService.getItems(this.productID).subscribe(
        (response: Item[]) => {
          items = response;
          observer.next(items);
          observer.complete();
        },
        (error: HttpErrorResponse) => {
          observer.error(error.message);
        }
      );
    });
  }

  main() {
    this.getItems().subscribe(
      (items: Item[]) => {
        this.items = items;

        this.items.forEach(item => {
          this.getItemEvents(item.id).subscribe(
            (response: ItemEvent[]) => {
              console.log(response.length > 0);
              if (response.length > 0) {
                item.item_events = response;

                this.getNextEventID(item.item_events).subscribe(
                  (response: number) => {
                    item.eventID = response;

                    // Now that eventID is set, make further requests
                    this.getEventDate(item.eventID).subscribe(
                      (response: Date) => {
                        item.next_date = response;
                        console.log("item.next_date: " + item.next_date);
                      },
                      (error: HttpErrorResponse) => {
                        alert(error.message);
                      }
                    );

                    this.getEventName(item.eventID).subscribe(
                      (response: String) => {
                        item.event_name = response;
                        console.log("item.event_name: " + item.event_name);
                      },
                      (error: HttpErrorResponse) => {
                        alert(error.message);
                      }
                    );
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
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  

  public deleteItem(itemId: number): void {
    this.itemService.deleteItem(itemId).subscribe({
      next: () => {
        console.log('Item deleted successfully');
        this.refreshItems(); // Refresh the item list
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
  
  private refreshItems(): void {
    this.getItems(); // Re-fetch the items after deletion
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

  getProductName(id: number): String {
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

  getNextEventID(itemEvents: ItemEvent[]): Observable<number> {
    return new Observable<number>((observer) => {
      var closestDate: Date = new Date('2999-12-31');
      var closestEventID: number = itemEvents[0].eventID;

      itemEvents.forEach(itemEvent => {
        var date: Date = new Date;

        this.getEventDate(itemEvent.eventID).subscribe(
          (response: Date) => {
            date = response;
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );

        if (date < closestDate) {
          closestDate = date;
          closestEventID = itemEvent.eventID;
        }
      })

      observer.next(closestEventID);
      observer.complete();
    });
  }

  getEventName(eventID: number): Observable<String> {
    return new Observable<String>((observer) => {
      var eventName: String = "";

      this.eventService.getEventName(eventID).subscribe(
        (response: String) => {
          eventName = response;
          observer.next(eventName);
          observer.complete();
        },
        (error: HttpErrorResponse) => {
          observer.error(error.message);
        }
      );
    });
  }

  getEventLink(eventID: number): string {
    return `http://localhost:4200/events/edit-event?id=${eventID}`;
  }

  addItem() {
    const item: Item = {
      id: 0,
      productID: this.productID,
      eventID: 0,
      serial_num: "",
      event_name: "",
      next_date: new Date(),
      item_events: []
    }

    this.itemService.addItem(item).toPromise();

    window.location.reload();
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
}
