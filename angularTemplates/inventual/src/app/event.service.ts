import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Event } from "./event";
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})
export class EventService {
    apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}

    public getEvents(): Observable<Event[]> {
        return this.http.get<Event[]>(`${this.apiServerUrl}/events/all`);
    }
}