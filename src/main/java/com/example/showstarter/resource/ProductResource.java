package com.example.showstarter.resource;

import com.example.showstarter.model.Item;
import com.example.showstarter.model.Product;
import com.example.showstarter.service.ItemService;
import com.example.showstarter.service.ProductService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.http.HttpStatus;

import java.sql.Date;
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

    @GetMapping("/get/{pageNum}")
    public ResponseEntity<List<Product>> getProductsByPage(@PathVariable("pageNum") int pageNum) {
        List<Product> products = productService.getProductsByPage(pageNum);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/stock_level/{id}")
    public ResponseEntity<Integer> getStockLevelById(@PathVariable("id") Long productID) {
        int stock_level = itemService.countByProductId(productID);
        return new ResponseEntity<>(stock_level, HttpStatus.OK);
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

    @GetMapping("/items/next_date/{id}")
    public ResponseEntity<Date> getNextDateFromEventID(@PathVariable("id") Integer eventID) {
        Date next_date = itemService.findDateByEventID(eventID);
        return new ResponseEntity<>(next_date, HttpStatus.OK);
    }

    @GetMapping("/items/event_name/{id}")
    public ResponseEntity<Object> getEventNameFromEventID(@PathVariable("id") Integer eventID) throws JsonProcessingException {
        String event_name = itemService.findEventNameByEventID(eventID);
        System.out.println("Event name: " + event_name);
        
        // Convert the event_name string to JSON
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonEventName = objectMapper.writeValueAsString(event_name);
        
        return new ResponseEntity<>(jsonEventName, HttpStatus.OK);
    }

    @PostMapping("/items/add")
    public ResponseEntity<Item> addItem(@RequestBody Item item) {
        Item newItem = itemService.addItem(item);
        return new ResponseEntity<>(newItem, HttpStatus.CREATED);
    }

    @GetMapping("/items/find/{id}")
    public ResponseEntity<Item> getItemById(@PathVariable("id") Long itemID) {
        Item item = itemService.findItemById(itemID);
        return new ResponseEntity<>(item, HttpStatus.OK);
    }

    @PutMapping("/items/update")
    public ResponseEntity<Item> updateItem(@RequestBody Item item) {
        Item updateItem = itemService.updateItem(item);
        return new ResponseEntity<>(updateItem, HttpStatus.OK);
    }

    @DeleteMapping("/items/delete/{id}")
    public ResponseEntity<?> deleteItem(@PathVariable("id") Long itemID) {
        itemService.deleteItem(itemID);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
