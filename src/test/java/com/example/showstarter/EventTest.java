package com.example.showstarter;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

import com.example.showstarter.model.Event;

class EventTest {

    @Test
    void get_all_events_test() {
		Event[] events = Event.get_all_events();
		
		assertEquals(Event.getEventID(events[0]), 1);
		assertEquals(events.length, 31);
		assertTrue(Event.getEventName(events[1]).equals("Conference XYZ"));
		
		assertEquals(Event.getInvoiceNum(events[0]), 1005);
		assertEquals(Event.getInvoiceNum(events[1]), 1002);
	}

}
