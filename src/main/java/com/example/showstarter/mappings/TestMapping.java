package com.example.showstarter.mappings;

import java.util.ArrayList;
import java.util.Arrays;
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
	public String events_map() {
		System.out.println("In the process of making something great!");
		Event[] events = Event.get_all_events();

		return "Currently in db: " + events.length + " events";
	}

}