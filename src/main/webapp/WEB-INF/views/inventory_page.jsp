<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.example.showstarter.mappings.Product" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Products</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            text-align: center;
        }
        header {
            background-color: #800000;
            color: #fff;
            padding: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        h1 {
            font-size: 20px;
            margin: 0;
        }
        p {
            font-size: 18px;
            margin: 0;
        }
        #product-details {
            padding: 20px;
            background-color: #fff;
            border-radius: 10px;
            margin: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        }
        .product-box {
            border: 1px solid #ddd;
            border-radius: 10px;
            padding: 10px;
            margin: 10px;
            text-align: left;
        }
        #search-bar {
            margin-top: 20px;
        }
    </style>
</head>
<body>
    
    <% Product[] products = Product.get_all_products(); %>
    
    <header>
        <div>
            <h1>Your Products</h1>
        </div>
    </header>
    <div id="search-bar">
        <label for="search">Search Product:</label>
        <input type="text" id="search" oninput="searchProducts()">
    </div>
    <div id="product-details">
        <!-- Java code will populate this section -->
    </div>

    <script>
        var products = [
            <% for (Product product : products) { %>
            { name: <%="\"" + Product.getName(product) + "\""%>, group: <%="\"" + Product.getProduct_group(product) + "\""%>, method: <%="\"" + Product.getStock_method(product) + "\""%>, rentalPrice: <%="\"" + Product.getRental_price(product) + "\""%> },
            <% } %>
        ];

        // JavaScript for searching products
        function searchProducts() {
            var searchTerm = document.getElementById("search").value.toLowerCase();
            var filteredProducts = products.filter(function(product) {
                return product.name.toLowerCase().includes(searchTerm);
            });
            displayProducts(filteredProducts);
        }

        // JavaScript for displaying products
        function displayProducts(productsArray) {
            var productDetailsDiv = document.getElementById("product-details");
            productDetailsDiv.innerHTML = "";

            productsArray.forEach(function(product) {
                var productBox = document.createElement("div");
                productBox.classList.add("product-box");
                productBox.innerHTML = "<h2>" + product.name + "</h2>" +
                                       "<p>Group: " + product.group + "</p>" +
                                       "<p>Stock Method: " + product.method + "</p>" +
                                       "<p>Rental Price: " + product.rentalPrice + "</p>";

                productDetailsDiv.appendChild(productBox);
            });
        }

        // Initial display of products
        displayProducts(products);
    </script>
</body>
</html>
