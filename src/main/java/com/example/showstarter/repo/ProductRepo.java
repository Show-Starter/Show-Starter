package com.example.showstarter.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.showstarter.model.Product;

import java.util.Optional;

public interface ProductRepo extends JpaRepository<Product, Long> {

    void deleteById(Long id);

    Optional<Product> findProductById(Long id);

    @Query("select COUNT(*) AS item_count from item where productid = ?1")
    int getStockLevelById(Long id);
    
}