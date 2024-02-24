package com.example.showstarter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.showstarter.mappings.Event;

@SpringBootApplication
@Controller
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @RequestMapping
    public String index() {
        return "index";
    }

    @RequestMapping("/events")
	public String events_map() {
		Event[] events = Event.get_all_events();

        System.out.println("The total number of events: " + events.length);

		return "events_page";
	}

}