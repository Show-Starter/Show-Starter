package com.example.showstarter.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.showstarter.model.Event;

import java.util.List;
import java.util.Optional;

public interface EventRepo extends JpaRepository<Event, Long> {

    void deleteById(Long id);

    Optional<Event> findEventById(Long id);

    @Query("SELECT e FROM Event e WHERE e.invoice_num = 0")
    List<Event> getUninvoicedEvents();
    
}
