package com.example.showstarter;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.junit.jupiter.api.Test;

class EventTest {
	
	@Test
	public void get_all_events_test() {
		Event[] events = Event.get_all_events();
		
		assertEquals(events[0].eventID, 1);
		assertEquals(events.length, 30);
		assertTrue(events[1].eventName.equals("Conference XYZ"));
		
		assertEquals(events[0].invoiceNum, 1001);
		assertEquals(events[1].invoiceNum, 1002);
	}

}
