package com.example.showstarter.mappings;

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
		return "Hello World!";
	}

}