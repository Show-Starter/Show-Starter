import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Event } from "./event";
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})
export class EventService {
    apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}


    public getById(id: number): Observable<Event> {
        return this.http.get<Event>(`${this.apiServerUrl}/events/find/${id}`);
    }
    public getEvents(): Observable<Event[]> {
        return this.http.get<Event[]>(`${this.apiServerUrl}/events/all`);
    }

    public addEvent(event: Event): Observable<Event> {
        return this.http.post<Event>(`${this.apiServerUrl}/events/add`, event);
    }

    public updateEvent(event: Event): Observable<Event> {
        return this.http.put<Event>(`${this.apiServerUrl}/events/update`, event);
    }

    public deleteEvent(eventID: Number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/events/delete/${eventID}`);
    }

    public getEventDate(eventID: Number): Observable<Date> {
        return this.http.get<Date>(`${this.apiServerUrl}/inventory/items/next_date/${eventID}`);
    }

    public getEventName(eventID: Number): Observable<String> {
        return this.http.get<String>(`${this.apiServerUrl}/inventory/items/event_name/${eventID}`);
    }

    public getUninvoicedEvents(): Observable<Event[]> {
        return this.http.get<Event[]>(`${this.apiServerUrl}/events/uninvoiced`);
    }
}