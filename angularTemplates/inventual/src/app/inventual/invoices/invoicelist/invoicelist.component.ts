import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Invoice } from 'src/app/invoice';
import { HttpErrorResponse } from '@angular/common/http';
import { InvoiceService } from 'src/app/invoice.service';

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

  menuSidebarActive: boolean = false;

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.getInvoices();
  }

  public task: Task = {
    name: '',
    completed: false,
    color: 'primary'
  };

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
        console.log("invoiceID: " + this.invoices[0].id);
        this.initParse();
        this.filterInvoices();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
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
}
