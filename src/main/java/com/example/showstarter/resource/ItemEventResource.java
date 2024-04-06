package com.example.showstarter.resource;

import java.sql.Date;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.showstarter.model.ItemEvent;
import com.example.showstarter.service.ItemEventService;
import com.example.showstarter.service.ItemService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/item_event")
public class ItemEventResource {
    private final ItemEventService itemEventService;
    private final ItemService itemService;

    public ItemEventResource(ItemEventService itemEventService, ItemService itemService) {
        this.itemEventService = itemEventService;
        this.itemService = itemService;
    }
    
    @GetMapping("/find/{id}")
    public ResponseEntity<List<ItemEvent>> getItemEventsByItemID(@PathVariable("id") Long itemID) {
        List<ItemEvent> itemEvents = itemEventService.findItemEventsByItemID(itemID);
        return new ResponseEntity<>(itemEvents, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ItemEvent>> getAllItemEvents() {
        List<ItemEvent> itemEvents = itemEventService.findAllItemEvents();
        return new ResponseEntity<>(itemEvents, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<ItemEvent> addItemEvent(@RequestBody ItemEvent itemEvent) {
        ItemEvent newItemEvent = itemEventService.addItemEvent(itemEvent);
        return new ResponseEntity<>(newItemEvent, HttpStatus.CREATED);
    }

    @PostMapping("/delete/{id}")
    public ResponseEntity<?> deleteItemEvent(@PathVariable("id") Long itemEventID) {
        itemEventService.deleteById(itemEventID);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/next_date/{id}")
    public ResponseEntity<Date> getNextDateFromEventID(@PathVariable("id") Long eventID) {
        Date next_date = itemService.findDateByEventID(eventID.intValue());
        return new ResponseEntity<>(next_date, HttpStatus.OK);
    }

    @GetMapping("/event_name/{id}")
    public ResponseEntity<Object> getEventNameFromEventID(@PathVariable("id") Long eventID) throws JsonProcessingException {
        String event_name = itemService.findEventNameByEventID(eventID.intValue());
        
        // Convert the event_name string to JSON
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonEventName = objectMapper.writeValueAsString(event_name);
        
        return new ResponseEntity<>(jsonEventName, HttpStatus.OK);
    }
}
