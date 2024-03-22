package com.example.showstarter.model;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    @Column(nullable = false, updatable = false)
    private Integer productID;
	private String serial_num;
	private Integer eventID;
    private Date next_date;
	
	public Item(int productID, String serial_num, int eventID, Date next_date) {
		// this.id = id;
		this.productID = productID;
		this.serial_num = serial_num;
        this.eventID = eventID;
        this.next_date = next_date;
	}

    public Item() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getProductID() {
        return productID;
    }

    public void setProductID(Integer productID) {
        this.productID = productID;
    }

    public String getSerial_num() {
        return serial_num;
    }

    public void setSerial_num(String serial_num) {
        this.serial_num = serial_num;
    }

    public Integer getEventID() {
        return eventID;
    }

    public void setEventID(Integer eventID) {
        this.eventID = eventID;
    }

    public Date getNext_date() {
        return next_date;
    }

    public void setNext_date(Date next_date) {
        this.next_date = next_date;
    }
}
