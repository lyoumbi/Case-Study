package com.perscholas.budgetorganizer.service;

import com.perscholas.budgetorganizer.model.Transaction;
import com.perscholas.budgetorganizer.model.User;
import com.perscholas.budgetorganizer.repository.TransactionRepository;
import com.perscholas.budgetorganizer.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.logging.Logger;

@Service
public class TransactionService {
    private Logger logger = Logger.getLogger(TransactionService.class.getName());
    private TransactionRepository transactionRepository;
    private UserRepository userRepository;

    @Autowired
    public TransactionService(TransactionRepository transactionRepository, UserRepository userRepository) {
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
    }

    public List<Transaction> findAll() {
        Iterable<Transaction> iterableTransactions = transactionRepository.findAll();
        List<Transaction> transactionList = new ArrayList<>();
        iterableTransactions.forEach(transactionList :: add);
        return transactionList;
    }

    public List<Transaction> findByUser(Long id) {
        User user = userRepository.findById(id).orElseGet(() -> null);
        List<Transaction> transactions = transactionRepository.findByUser(user);
        return transactions;
    }

    public Transaction findById(Long id) {
        return transactionRepository.findById(id).orElseGet(() -> null);
    }

    public Transaction create(Transaction transaction, Long id) {
        Long lastId = findAll().stream()
                                .map(tr -> tr.getId())
                                .max(Comparator.naturalOrder())
                                .orElseGet(() -> 0L);
        transaction.setId(lastId + 1);
        if(transaction.getType() == "" || transaction.getTransactionType() == "") {
            return null;
        }

        if(transaction.getAmount() == null) {
            transaction.setAmount(0D);
        }

        if(transaction.getDescription() == "") {
            transaction.setDescription("New Transaction");
        }

        if(transaction.getLocation() == "") {
            transaction.setLocation("Store or Online");
        }

        transaction.setUser(userRepository.findById(id).get());
        return transactionRepository.save(transaction);
    }

    public Transaction deleteById(Long id) {
        Transaction transaction = findById(id);
        if(transaction == null) return null;
        transactionRepository.delete(transaction);
        return transaction;
    }

    public Transaction update(Long id, Transaction transaction) {
        Transaction transactionToBeUpdated = findById(id);
        if(transactionToBeUpdated == null) return null;
        transactionToBeUpdated.setType(transaction.getType());
        transactionToBeUpdated.setDescription(transaction.getDescription());
        transactionToBeUpdated.setTransactionType(transaction.getTransactionType());
        transactionToBeUpdated.setAmount(transaction.getAmount());
        transactionToBeUpdated.setLocation(transaction.getLocation());
        transactionToBeUpdated.setDate(transaction.getDate());
        return transactionRepository.save(transactionToBeUpdated);
    }



}
