import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ItemEvent } from "./itemevent";
import { Item } from "./item";

@Injectable({providedIn: 'root'})
export class ItemEventService {
    apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}


    public getById(id: number): Observable<ItemEvent> {
        return this.http.get<ItemEvent>(`${this.apiServerUrl}/item_event/find/${id}`);
    }
    public getItemEvents(): Observable<ItemEvent[]> {
        return this.http.get<ItemEvent[]>(`${this.apiServerUrl}/item_event/all`);
    }

    public getItemEventsByItemID(itemID: number): Observable<ItemEvent[]> {
        return this.http.get<ItemEvent[]>(`${this.apiServerUrl}/item_event/find/${itemID}`)
    }

    public getItemEventsByEventID(eventID: number): Observable<ItemEvent[]> {
        return this.http.get<ItemEvent[]>(`${this.apiServerUrl}/item_event/find/event/${eventID}`)
    }

    public addItemEvent(item_event: ItemEvent): Observable<ItemEvent> {
        return this.http.post<ItemEvent>(`${this.apiServerUrl}/item_event/add`, item_event);
    }

    public updateItemEvent(item_event: ItemEvent): Observable<ItemEvent> {
        return this.http.put<ItemEvent>(`${this.apiServerUrl}/item_event/update`, item_event);
    }

    public deleteItemEvent(eventID: Number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/item_event/delete/${eventID}`);
    }
}