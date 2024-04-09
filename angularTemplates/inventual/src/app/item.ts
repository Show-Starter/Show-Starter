import { ItemEvent } from "./itemevent";

export interface Item {
    id: number;
    productID: number;
    serial_num: string;
    eventID: number;
    event_name: String;
    next_date: Date;
    item_events: ItemEvent[]
}