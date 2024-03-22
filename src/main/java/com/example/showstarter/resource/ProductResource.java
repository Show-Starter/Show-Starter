package com.example.showstarter.resource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.showstarter.model.Item;
import com.example.showstarter.model.Product;
import com.example.showstarter.service.ItemService;
import com.example.showstarter.service.ProductService;
import org.springframework.http.HttpStatus;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/inventory")
public class ProductResource {
    private final ProductService productService;
    private final ItemService itemService;

    public ProductResource(ProductService productService, ItemService itemService) {
        this.productService = productService;
        this.itemService = itemService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.findAllProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }
    
    @GetMapping("/find/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable("id") Long productID) {
        Product product = productService.findProductById(productID);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        Product newProduct = productService.addProduct(product);
        return new ResponseEntity<>(newProduct, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Product> updateProduct(@RequestBody Product product) {
        Product updateProduct = productService.updateProduct(product);
        return new ResponseEntity<>(updateProduct, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable("id") Long productID) {
        productService.deleteProduct(productID);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/items/{id}")
    public ResponseEntity<List<Item>> getAllItems(@PathVariable("id") Long productID) {
        List<Item> items = itemService.findAllItems(productID);
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @PostMapping("/items/add")
    public ResponseEntity<Item> addItem(@RequestBody Item item) {
        Item newItem = itemService.addItem(item);
        return new ResponseEntity<>(newItem, HttpStatus.CREATED);
    }

}
