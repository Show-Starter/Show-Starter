package com.example.showstarter.service;

import java.sql.Date;
import java.util.List;
import java.util.UUID;

import jakarta.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.example.showstarter.exception.ProductNotFoundException;
import com.example.showstarter.model.Item;
import com.example.showstarter.repo.ItemRepo;

@Service
@Transactional
public class ItemService {
    private final ItemRepo itemRepo;

    public ItemService(ItemRepo itemRepo) {
        this.itemRepo = itemRepo;
    }

    public Item addItem(Item item) {
        item.setSerial_num(UUID.randomUUID().toString());
        item.setNext_date(findDateByEventID(item.getEventID()));
        item.setEvent_name(findEventNameByEventID(item.getEventID()));
        return itemRepo.save(item);
    }

    public List<Item> findAllItems(Long productID) {
        return itemRepo.findByProductID(productID);
    }

    public Item updateItem(Item item) {
        if (item.getEventID() != null) {
            item.setNext_date(itemRepo.findDateByEventID(item.getEventID()));
        }
        else {
            item.setNext_date(null);
        }
        return itemRepo.save(item);
    }

    public void deleteItem(Long itemID) {
        itemRepo.deleteById(itemID);
    }

    public Date findDateByEventID(Integer eventID) {
        return itemRepo.findDateByEventID(eventID);
    }

    public String findEventNameByEventID(Integer eventID) {
        return itemRepo.findEventNameByEventID(eventID);
    }

    public boolean isItemAvailable(Date itemDate, Date eventDate) {
        if (itemDate.toString().equals(eventDate.toString())) {
            return false;
        } else {
            return true;
        }
    }

    public Item findItemById(Long itemID) {
        return itemRepo.findItemById(itemID)
            .orElseThrow(() -> new ProductNotFoundException("Item by id " + itemID + " was not found"));
    }
}
