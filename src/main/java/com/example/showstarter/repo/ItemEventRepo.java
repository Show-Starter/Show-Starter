package com.example.showstarter.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.showstarter.model.ItemEvent;

import java.util.List;
import java.util.Optional;

public interface ItemEventRepo extends JpaRepository<ItemEvent, Long> {

    void deleteById(Long id);

    Optional<ItemEvent> findItemEventById(Long id);

    List<ItemEvent> findByItemID(Long itemID);

    List<ItemEvent> findByEventID(Long eventID);
    
}

