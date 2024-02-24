package com.example.showstarter.mappings;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class ProductTest {

	@Test
	void get_all_products_test() {
		Product[] products = Product.get_all_products();
		
		assertEquals(934, products.length);
        assertEquals(701, products[103].productID);

        assertEquals("Speaker Stands", products[5].name);
	}

}
