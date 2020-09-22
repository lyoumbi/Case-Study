package com.perscholas.budgetorganizer.controller;

import com.perscholas.budgetorganizer.model.Transaction;
import com.perscholas.budgetorganizer.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/transaction")
public class TransactionController {

    private TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping("/all/{id}")
    public List<Transaction> findAllByUser(@PathVariable Long id) {
        return transactionService.findByUser(id);
    }

    @PostMapping("/create/{id}")
    public Transaction create(@RequestBody Transaction transaction, @PathVariable Long id) {
        return transactionService.create(transaction, id);
    }

    @GetMapping("/{id}")
    public Transaction findById(@PathVariable Long id) {
        return transactionService.findById(id);
    }

    @PutMapping("/{id}")
    public Transaction updateById(@PathVariable Long id, @RequestBody Transaction transaction) {
        return transactionService.update(id, transaction);
    }

    @DeleteMapping("/{id}")
    public Transaction deleteById(@PathVariable Long id) {
        return transactionService.deleteById(id);
    }
}
