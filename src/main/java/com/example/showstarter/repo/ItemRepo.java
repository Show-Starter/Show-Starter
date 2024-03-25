package com.example.showstarter.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.showstarter.model.Item;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

public interface ItemRepo extends JpaRepository<Item, Long> {

    void deleteById(Long id);

    List<Item> findByProductID(Long productID);

    Optional<Item> findItemById(Long id);

    @Query("select date from Event e where e.id = ?1")
    Date findDateByEventID(Integer eventID);

    @Query("select name from Event e where e.id = ?1")
    String findEventNameByEventID(Integer eventID);

    int countByProductID(Long productID);
}
