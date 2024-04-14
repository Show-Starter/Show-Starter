package com.example.showstarter.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.example.showstarter.model.ItemEvent;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

public interface ItemEventRepo extends JpaRepository<ItemEvent, Long> {

    void deleteById(Long id);

    @Transactional
    void deleteByItemIDAndEventID(Long itemId, Long eventId);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO item_event (item_id, event_id) VALUES (:itemId, :eventId)", nativeQuery = true)
    void insertItemEvent(Long itemId, Long eventId);

    Optional<ItemEvent> findItemEventById(Long id);

    List<ItemEvent> findByItemID(Long itemID);

    List<ItemEvent> findByEventID(Long eventID);
    
}

