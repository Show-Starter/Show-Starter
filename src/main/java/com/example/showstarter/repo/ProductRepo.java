package com.example.showstarter.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.showstarter.model.Product;

import java.util.List;
import java.util.Optional;

public interface ProductRepo extends JpaRepository<Product, Long> {

    void deleteById(Long id);

    Optional<Product> findProductById(Long id);

    // @Query("SELECT * FROM product p ORDER BY p.id LIMIT 100 OFFSET ((?1 - 1) * 100)")
    // List<Product> getProductsByPage(Long pageNum);

    @Query(value = "SELECT p FROM Product p ORDER BY p.id",
       countQuery = "SELECT COUNT(p) FROM Product p")
    List<Product> getProductsByPage(@Param("pageNum") int pageNum);
    
}