package com.example.showstarter.mappings;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class CustomRowMapperProduct implements RowMapper<Product> {

    @Override
    public Product mapRow(ResultSet rs, int rowNum) throws SQLException {

        Product product = new Product();
        product.productID = rs.getInt("id");
        product.name = rs.getString("name");
        product.product_group = rs.getString("product_group");
        product.stock_method = rs.getString("stock_method");
        product.rental_price = rs.getInt("rental_price");
        product.eventID = rs.getInt("event_id");

        // this.productID = productID;
		// this.name = name;
		// this.product_group = product_group;
		// this.stock_method = stock_method;
		// this.rental_price = rental_price;
		// this.eventID = eventID;

        return product;

    }
}