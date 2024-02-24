package com.example.showstarter.mappings;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

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
	
	public static Product[] get_all_products() {
		Product[] products = new Product[0];
		int numProducts = 0;
		
		try {
            Class.forName("org.postgresql.Driver");
        }
        catch (java.lang.ClassNotFoundException e) {
            System.out.println(e.getMessage());
        }

        String url = "jdbc:postgresql://lallah.db.elephantsql.com:5432/orunmzej";
        String username = "orunmzej";
        String password = "WkVYLIBK36XLSG5ceqh9oQuYTbEEndjH";

        try {
            Connection db = DriverManager.getConnection(url, username, password);
            Statement st = db.createStatement();
            ResultSet rs = st.executeQuery("SELECT * FROM products");
            while (rs.next()) {
            	numProducts++;
            }
            products = new Product[numProducts];
            rs = st.executeQuery("SELECT * FROM products");
            int i = 0;
            while (rs.next()) {
                products[i] = new Product(rs.getInt(1), rs.getString(2), rs.getString(3), rs.getString(4), rs.getInt(5), rs.getInt(6));
                i++;
            }
            rs.close();
            st.close();
            }
        catch (java.sql.SQLException e) {
            System.out.println(e.getMessage());
        }
		
		return products;
	}

    // public static void main(String[] args) {
    //     Product[] products = get_all_products();

    //     System.out.println(products[74].name);
    // }
	
}
