package com.example.showstarter.resource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.showstarter.model.Event;
import com.example.showstarter.service.EventService;
import org.springframework.http.HttpStatus;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/events")
public class EventResource {
    private final EventService eventService;

    public EventResource(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Event>> getAllEvents() {
        List<Event> events = eventService.findAllEvents();
        return new ResponseEntity<>(events, HttpStatus.OK);
    }
    
    @GetMapping("/find/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable("id") Long eventID) {
        Event event = eventService.findEventById(eventID);
        return new ResponseEntity<>(event, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Event> addEvent(@RequestBody Event event) {
        Event newEvent = eventService.addEvent(event);
        return new ResponseEntity<>(newEvent, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Event> updateEvent(@RequestBody Event event) {
        Event updateEvent = eventService.updateEvent(event);
        return new ResponseEntity<>(updateEvent, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable("id") Long eventID) {
        eventService.deleteEvent(eventID);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/uninvoiced")
    public ResponseEntity<List<Event>> getUninvoicedEvents() {
        List<Event> uninvoicedEvents = eventService.getUninvoicedEvents();
        return new ResponseEntity<>(uninvoicedEvents, HttpStatus.OK);
    }

}
