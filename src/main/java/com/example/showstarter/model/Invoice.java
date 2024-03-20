package com.example.showstarter.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String first_name;
    private String last_name;
    private String bill_add; // bill address
    private String bill_city;
    private String bill_state;
    private Long card_num;
    private String exp_date;
	private Double amount;
    @Column(nullable = false, updatable = false)
	private int event_id;
	
	public Invoice(String first_name, String last_name, String bill_add, String bill_city, String bill_state, Long card_num, String exp_date, Double amount, int event_id) {
		this.first_name = first_name;
		this.last_name = last_name;
		this.bill_add = bill_add;
		this.bill_city = bill_city;
		this.bill_state = bill_state;
		this.card_num = card_num;
        this.exp_date = exp_date;
        this.amount = amount;
        this.event_id = event_id;
	}

    public Invoice() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getBill_add() {
        return bill_add;
    }

    public void setBill_add(String bill_add) {
        this.bill_add = bill_add;
    }

    public String getBill_city() {
        return bill_city;
    }

    public void setBill_city(String bill_city) {
        this.bill_city = bill_city;
    }

    public String getBill_state() {
        return bill_state;
    }

    public void setBill_state(String bill_state) {
        this.bill_state = bill_state;
    }

    public Long getCard_num() {
        return card_num;
    }

    public void setCard_num(Long card_num) {
        this.card_num = card_num;
    }

    public String getExp_date() {
        return exp_date;
    }

    public void setExp_date(String exp_date) {
        this.exp_date = exp_date;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public int getEvent_id() {
        return event_id;
    }

    public void setEvent_id(int event_id) {
        this.event_id = event_id;
    }

}
