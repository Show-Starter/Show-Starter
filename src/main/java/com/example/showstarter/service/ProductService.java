package com.example.showstarter.service;

import java.util.List;
import jakarta.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.example.showstarter.exception.ProductNotFoundException;
import com.example.showstarter.model.Product;
import com.example.showstarter.repo.ProductRepo;

@Service
@Transactional
public class ProductService {
    private final ProductRepo productRepo;

    public ProductService(ProductRepo productRepo) {
        this.productRepo = productRepo;
    }

    public Product addProduct(Product product) {
        return productRepo.save(product);
    }

    public List<Product> findAllProducts() {
        return productRepo.findAll();
    }

    public List<Product> getProductsByPage(int pageNum) {
        return productRepo.getProductsByPage(pageNum);
    }

    public Product updateProduct(Product product) {
        return productRepo.save(product);
    }

    public void deleteProduct(Long productID) {
        productRepo.deleteById(productID);
    }

    public Product findProductById(Long productID) {
        return productRepo.findProductById(productID)
            .orElseThrow(() -> new ProductNotFoundException("Product by id " + productID + " was not found"));
    }
}
