import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Invoice } from 'src/app/invoice';
import { HttpErrorResponse } from '@angular/common/http';
import { InvoiceService } from 'src/app/invoice.service';
import { Observable } from 'rxjs';
import { EventService } from 'src/app/event.service';
import { Event } from 'src/app/event';
import { MatDialog } from '@angular/material/dialog';
import { FindEventDialogComponent } from '../find-event-dialog/find-event-dialog.component';
import { Router } from '@angular/router';

interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
}

@Component({
  selector: 'app-invoicelist',
  templateUrl: './invoicelist.component.html',
  styleUrls: ['./invoicelist.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InvoicelistComponent implements OnInit {
  public invoices: Invoice[];
  public parsedInvoices: Invoice[] = [];
  public searchText: string;
  public tasks: Task[] = [];
  public currentPage: number = 1;
  public itemsPerPage: number = 50;
  public allComplete: boolean = false;
  public events: Event[] = [];
  public parsedEvents: Event[] = [];

 


  menuSidebarActive: boolean = false;
  event: Event = {
    id: 0,
    name: "",
    location: "",
    type: "",
    date: new Date,
    time: "",
    invoice_num: 0
  };


  constructor(private invoiceService: InvoiceService, private eventService: EventService, private dialog: MatDialog,
    private router: Router) {}

  ngOnInit(): void {
    this.getInvoices();
  }

  public task: Task = {
    name: '',
    completed: false,
    color: 'primary'
  };

  goToEditInvoice(invoiceID: number) {
    this.router.navigateByUrl(`/invoices/edit-invoice?id=${invoiceID}`);
  }

  public deleteInvoice(invoiceId: number): void {
    this.invoiceService.deleteInvoice(invoiceId).subscribe({
      next: () => {
        console.log('Invoice deleted successfully');
        this.refreshInvoices(); // Refresh the invoice list
      },
      error: (error: HttpErrorResponse) => {
        console.error('There was an error!', error);
      }
    });
  }

  public filterInvoices(): void {
    if (this.searchText == '') {
      this.parsedInvoices = this.invoices; // If no search text, show all invoices
    } else {
      this.parsedInvoices = this.invoices.filter(invoice =>
        invoice.first_name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        invoice.last_name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        invoice.event_id.toString().includes(this.searchText)
      );
    }
  }
  
  private refreshInvoices(): void {
    this.getInvoices(); // Re-fetch the invoices after deletion
  }

  public getInvoices(): void {
    this.invoiceService.getInvoices().subscribe(
      (response: Invoice[]) => {
        this.invoices = response;

        this.invoices.forEach(async invoice => {
          const event_name = await this.getEventName(invoice.event_id).toPromise();

          if (event_name) {
            invoice.event_name = event_name.valueOf();
          }
        })

        console.log("invoiceID: " + this.invoices[0].id);
        this.initParse();
        this.filterInvoices();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
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

  private initParse(): void {
    this.tasks = [];
    for (let i = 0; i < this.invoices.length; i++) {
      if (i >= (this.currentPage - 1) * this.itemsPerPage && i < this.currentPage * this.itemsPerPage) {
        this.parsedInvoices.push(this.invoices[(this.itemsPerPage * (this.currentPage - 1)) + i]);
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
    this.parsedInvoices = [];
    this.initParse();
  }

  public myfunction(): void {
    this.menuSidebarActive = !this.menuSidebarActive;
  }



  //until we have invoice in backend

}
