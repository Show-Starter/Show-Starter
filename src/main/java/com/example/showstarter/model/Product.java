package com.example.showstarter.model;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity
public class Product implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
	private String name;
	private String product_group;
	private String stock_method;
	private Integer rental_price;
	private Integer eventID;

    public Product() {}
	
	public Product(String name, String product_group, String stock_method, int rental_price, int eventID) {
		// this.productID = productID;
		this.name = name;
		this.product_group = product_group;
		this.stock_method = stock_method;
		this.rental_price = rental_price;
		this.eventID = eventID;
	}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getProduct_group() {
        return product_group;
    }

    public void setProduct_group(String product_group) {
        this.product_group = product_group;
    }

    public String getStock_method() {
        return stock_method;
    }

    public void setStock_method(String stock_method) {
        this.stock_method = stock_method;
    }

    public Integer getRental_price() {
        return rental_price;
    }

    public void setRental_price(Integer rental_price) {
        this.rental_price = rental_price;
    }

    public Integer getEventID() {
        return eventID;
    }

    public void setEventID(Integer eventID) {
        this.eventID = eventID;
    }
}
