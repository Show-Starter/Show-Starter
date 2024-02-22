package com.example.showstarter.mappings;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestMapping {

	@GetMapping("/testing")
	public String index() {
		return "Greetings from Spring Boot!";
	}

	@GetMapping("/events")
	public List<Event> events_map() {
		Event[] events = Event.get_all_events();
		List<Event> eventsList = new ArrayList<>();

		for (int i = 0; i < events.length; i++) {
			eventsList.add(events[i]);
		}

		return eventsList;
	}

}