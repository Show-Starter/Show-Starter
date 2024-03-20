package com.example.showstarter.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.showstarter.model.Invoice;

import java.util.Optional;

public interface InvoiceRepo extends JpaRepository<Invoice, Long> {

    void deleteById(Long id);

    Optional<Invoice> findInvoiceById(Long id);
    
}
