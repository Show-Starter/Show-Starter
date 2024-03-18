import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "./product";
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})
export class ProductService {
    apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}

    public getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.apiServerUrl}/inventory/all`);
    }

    public addProduct(product: Product): Observable<Product> {
        return this.http.post<Product>(`${this.apiServerUrl}/inventory/add`, product);
    }

    public updateProduct(product: Product): Observable<Product> {
        return this.http.put<Product>(`${this.apiServerUrl}/inventory/update`, product);
    }

    public deleteProduct(productID: Number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/inventory/delete/${productID}`);
    }
}