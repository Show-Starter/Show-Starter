package com.example.showstarter.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.showstarter.model.Product;

import java.util.Optional;

public interface ProductRepo extends JpaRepository<Product, Long> {

    void deleteById(Long id);

    Optional<Product> findProductById(Long id);
    
}