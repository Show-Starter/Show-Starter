package com.example.showstarter.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.showstarter.model.Event;

import java.util.Optional;

public interface EventRepo extends JpaRepository<Event, Long> {

    void deleteById(Long id);

    Optional<Event> findEventById(Long id);
    
}
