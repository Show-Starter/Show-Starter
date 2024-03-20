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
        return this.http.get<Invoice[]>(`${this.apiServerUrl}/inventory/all`);
    }

    public addInvoice(invoice: Invoice): Observable<Invoice> {
        return this.http.post<Invoice>(`${this.apiServerUrl}/inventory/add`, invoice);
    }

    public updateInvoice(invoice: Invoice): Observable<Invoice> {
        return this.http.put<Invoice>(`${this.apiServerUrl}/inventory/update`, invoice);
    }

    public deleteInvoice(invoiceID: Number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/inventory/delete/${invoiceID}`);
    }
}