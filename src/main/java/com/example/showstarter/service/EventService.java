package com.example.showstarter.service;

import java.util.List;
import jakarta.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.example.showstarter.exception.EventNotFoundException;
import com.example.showstarter.model.Event;
import com.example.showstarter.repo.EventRepo;

@Service
@Transactional
public class EventService {
    private final EventRepo eventRepo;

    public EventService(EventRepo eventRepo) {
        this.eventRepo = eventRepo;
    }

    public Event addEvent(Event event) {
        return eventRepo.save(event);
    }

    public List<Event> findAllEvents() {
        return eventRepo.findAll();
    }

    public Event updateEvent(Event event) {
        return eventRepo.save(event);
    }

    public void deleteEvent(Long eventID) {
        eventRepo.deleteById(eventID);
    }

    public Event findEventById(Long eventID) {
        return eventRepo.findEventById(eventID)
            .orElseThrow(() -> new EventNotFoundException("Event by id " + eventID + " was not found"));
    }

    public List<Event> getUninvoicedEvents() {
        return eventRepo.getUninvoicedEvents();
    }
}