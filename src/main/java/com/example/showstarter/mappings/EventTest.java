package com.example.showstarter.mappings;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

class EventTest {

    @Test
    void get_all_events_test() {
		Event[] events = Event.get_all_events();
		
		assertEquals(events[0].eventID, 1);
		assertEquals(events.length, 30);
		assertTrue(events[1].eventName.equals("Conference XYZ"));
		
		assertEquals(events[0].invoiceNum, 1001);
		assertEquals(events[1].invoiceNum, 1002);
	}

}
