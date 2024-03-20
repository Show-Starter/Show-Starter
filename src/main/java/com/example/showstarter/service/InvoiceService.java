package com.example.showstarter.service;

import java.util.List;
import jakarta.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.example.showstarter.exception.InvoiceNotFoundException;
import com.example.showstarter.model.Invoice;
import com.example.showstarter.repo.InvoiceRepo;

@Service
@Transactional
public class InvoiceService {
    private final InvoiceRepo invoiceRepo;

    public InvoiceService(InvoiceRepo invoiceRepo) {
        this.invoiceRepo = invoiceRepo;
    }

    public Invoice addInvoice(Invoice invoice) {
        return invoiceRepo.save(invoice);
    }

    public List<Invoice> findAllInvoices() {
        return invoiceRepo.findAll();
    }

    public Invoice updateInvoice(Invoice invoice) {
        return invoiceRepo.save(invoice);
    }

    public void deleteInvoice(Long invoiceID) {
        invoiceRepo.deleteById(invoiceID);
    }

    public Invoice findInvoiceById(Long invoiceID) {
        return invoiceRepo.findInvoiceById(invoiceID)
            .orElseThrow(() -> new InvoiceNotFoundException("Invoice by id " + invoiceID + " was not found"));
    }
}