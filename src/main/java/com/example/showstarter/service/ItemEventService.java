package com.example.showstarter.service;

import java.util.List;
import jakarta.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.example.showstarter.model.ItemEvent;
import com.example.showstarter.repo.ItemEventRepo;

@Service
@Transactional
public class ItemEventService {
    private final ItemEventRepo itemEventRepo;

    public ItemEventService(ItemEventRepo itemEventRepo) {
        this.itemEventRepo = itemEventRepo;
    }

    public List<ItemEvent> findItemEventsByItemID(Long itemID) {
        return itemEventRepo.findByItemID(itemID);
    }

    public List<ItemEvent> findItemEventsByEventID(Long eventID) {
        return itemEventRepo.findByEventID(eventID);
    }

    public ItemEvent addItemEvent(ItemEvent itemEvent) {
        return itemEventRepo.save(itemEvent);
    }

    public List<ItemEvent> findAllItemEvents() {
        return itemEventRepo.findAll();
    }

    public void deleteById(Long itemEventID) {
        itemEventRepo.deleteById(itemEventID);
    }
}
