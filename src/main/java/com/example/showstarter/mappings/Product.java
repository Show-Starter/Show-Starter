package com.example.showstarter.mappings;

import java.sql.SQLException;
import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;

public class Product {
	int productID;
	String name;
	String product_group;
	String stock_method;
	int rental_price;
	int eventID;
	
	public Product(int productID, String name, String product_group, String stock_method, int rental_price, int eventID) {
		this.productID = productID;
		this.name = name;
		this.product_group = product_group;
		this.stock_method = stock_method;
		this.rental_price = rental_price;
		this.eventID = eventID;
	}

    public Product() {
    }
	
	public static Product[] get_all_products() {
        JdbcTemplate jdbcTemplate = new JdbcTemplate();
        try {
            jdbcTemplate = DatabaseConfig.jdbcTemplate();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        String sql = "SELECT * FROM products";
        List<Product> products = jdbcTemplate.query(sql, new CustomRowMapperProduct());

        Product[] productsArr = new Product[products.size()];

        for (int i = 0; i < productsArr.length; i++) {
            productsArr[i] = products.get(i);
        }

        return productsArr;
    }

    public static int getProductID(Product product) {
        return product.productID;
    }

    public static String getName(Product product) {
        return product.name;
    }

    public static String getProduct_group(Product product) {
        return product.product_group;
    }

    public static String getStock_method(Product product) {
        return product.stock_method;
    }

    public static int getRental_price(Product product) {
        return product.rental_price;
    }

    public static int getEventID(Product product) {
        return product.eventID;
    }

    public static String verify_event_id(int eventID) {
        if (eventID == 0) {
            return "No event assigned.";
        } else {
            return Integer.toString(eventID);
        }
    }
	
}
