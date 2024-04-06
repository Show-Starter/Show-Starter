import { ItemEvent } from "./itemevent";

export interface Item {
    id: number;
    productID: number;
    serial_num: string;
    item_events: ItemEvent[];
    next_date: Date;
    event_name: String;
}