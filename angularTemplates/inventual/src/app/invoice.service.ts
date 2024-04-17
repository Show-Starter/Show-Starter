import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Invoice } from "./invoice";
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})
export class InvoiceService {
    apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}

    public getInvoices(): Observable<Invoice[]> {
        return this.http.get<Invoice[]>(`${this.apiServerUrl}/invoices/all`);
    }

    public addInvoice(invoice: Invoice): Observable<Invoice> {
        return this.http.post<Invoice>(`${this.apiServerUrl}/invoices/add`, invoice);
    }

    public updateInvoice(invoice: Invoice): Observable<Invoice> {
        return this.http.put<Invoice>(`${this.apiServerUrl}/invoices/update`, invoice);
    }

    public deleteInvoice(invoiceID: Number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/invoices/delete/${invoiceID}`);
    }

    public getInvoice(invoiceID: Number): Observable<Invoice> {
        return this.http.get<Invoice>(`${this.apiServerUrl}/invoices/find/${invoiceID}`);
    }
}