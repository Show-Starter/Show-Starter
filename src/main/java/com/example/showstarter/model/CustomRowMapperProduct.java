package com.example.showstarter.model;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class CustomRowMapperProduct implements RowMapper<Product> {

    @Override
    public Product mapRow(ResultSet rs, int rowNum) throws SQLException {

        Product product = new Product();
        product.setId(rs.getLong("id"));
        product.setName(rs.getString("name"));
        product.setProduct_group(rs.getString("product_group"));
        product.setStock_method(rs.getString("stock_method"));
        product.setRental_price(rs.getInt("rental_price"));
        product.setEventID(rs.getInt("event_id"));

        // this.productID = productID;
		// this.name = name;
		// this.product_group = product_group;
		// this.stock_method = stock_method;
		// this.rental_price = rental_price;
		// this.eventID = eventID;

        return product;

    }
}