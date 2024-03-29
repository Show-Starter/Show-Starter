import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Item } from "./item";
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})
export class ItemService {
    apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}
    
    public getById(id: number): Observable<Item> {
        return this.http.get<Item>(`${this.apiServerUrl}/inventory/items/find/${id}`);
    }
    public getAllItems(): Observable<Item[]> {
        return this.http.get<Item[]>(`${this.apiServerUrl}/inventory/items/all`);
    }

    public getItems(product_id: number): Observable<Item[]> {
        return this.http.get<Item[]>(`${this.apiServerUrl}/inventory/items/${product_id}`);
    }

    public addItem(item: Item): Observable<Item> {
        return this.http.post<Item>(`${this.apiServerUrl}/inventory/items/add`, item);
    }

    public updateItem(item: Item): Observable<Item> {
        return this.http.put<Item>(`${this.apiServerUrl}/inventory/items/update`, item);
    }

    public deleteItem(itemID: Number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/inventory/items/delete/${itemID}`);
    }
}