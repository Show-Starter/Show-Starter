package com.example.showstarter.mappings;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestMapping {

	@GetMapping("/testing")
	public String index() {
		return "Greetings from Spring Boot!";
	}

	@GetMapping("/add-event")
    public String addEvent() {
		Event[] allEventsBefore = Event.get_all_events();

        Event.add_event("JD Wedding", "Kansas", "Wedding", "02/26/2024", "18:00", 1);

		Event[] allEventsAfter = Event.get_all_events();

		if (allEventsAfter.length > allEventsBefore.length) {
			return "Insertion was completed!";
		}
		else {
			return "Insertion was not completed :(";
		}
    }

}