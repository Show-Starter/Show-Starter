package com.example.showstarter.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
	private String name;
	private String location;
	private String type;
	private String date;
	private String time;
	private int invoice_num;
	
	public Event(String name, String location, String type, String date, String time, int invoice_num) {
		// this.id = id;
		this.name = name;
		this.location = location;
		this.type = type;
		this.date = date;
		this.time = time;
		this.invoice_num = invoice_num;
	}

    public Event() {}

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

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public int getInvoice_num() {
        return invoice_num;
    }

    public void setInvoice_num(int invoice_num) {
        this.invoice_num = invoice_num;
    }
}
