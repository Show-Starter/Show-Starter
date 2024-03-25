import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Event } from 'src/app/event';
import { HttpErrorResponse } from '@angular/common/http';
import { EventService } from 'src/app/event.service';
import { Router } from '@angular/router';

interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
}

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EventlistComponent implements OnInit {
  public events: Event[] = [];
  public parsedEvents: Event[] = [];
  public searchText: string = '';
  public tasks: Task[] = [];
  public currentPage: number = 1;
  public itemsPerPage: number = 100;
  public allComplete: boolean = false;
  public itemListURL = "http://localhost:4200/events/find?id=";

  menuSidebarActive: boolean = false;

  constructor(private eventService: EventService,private router:Router) {}

  ngOnInit(): void {
    this.getEvents();
  }

  public task: Task = {
    name: '',
    completed: false,
    color: 'primary'
  };

  public deleteEvent(eventID: number): void {
    this.eventService.deleteEvent(eventID).subscribe({
      next: () => {
        console.log('Event deleted successfully');
        this.refreshProducts(); // Refresh the product list
      },
      error: (error: HttpErrorResponse) => {
        console.error('There was an error!', error);
      }
    });
  }

  public updateEvent(event: Event): void {
    this.eventService.updateEvent(event);
  }

  public goToItemList(id: number): void {
    this.router.navigateByUrl(`/events/find?id=${id}`);
  }

  public filterProducts(): void {
   
    if (this.searchText == '') {
      this.initParse(); // If no search text, show all products
    } else {
      this.parsedEvents = this.events.filter(event =>
        (event.name != null && event.name.toLowerCase().includes(this.searchText.toLowerCase())) ||
        (event.location != null && event.location.toLowerCase().includes(this.searchText.toLowerCase())) ||
        (event.invoice_num.toString().includes(this.searchText)) ||
        event.id == +this.searchText
      );
    }
  }
  
  private refreshProducts(): void {
    this.getEvents(); // Re-fetch the products after deletion
  }

  public getEvents(): void {
    this.eventService.getEvents().subscribe(
      (response: Event[]) => {
        this.events = response;
        console.log("eventID: " + this.events[0].id);
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
    this.parsedEvents = [];
    for (let i = 0; i < this.events.length; i++) {
      if (i >= (this.currentPage - 1) * this.itemsPerPage && i < this.currentPage * this.itemsPerPage) {
        this.parsedEvents.push(this.events[(this.itemsPerPage * (this.currentPage - 1)) + i]);
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
    this.parsedEvents = [];
    this.initParse();
  }

  public myfunction(): void {
    this.menuSidebarActive = !this.menuSidebarActive;
  }
}
