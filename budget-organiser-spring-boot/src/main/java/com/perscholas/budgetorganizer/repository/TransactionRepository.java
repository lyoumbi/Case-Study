package com.perscholas.budgetorganizer.repository;

import com.perscholas.budgetorganizer.model.Transaction;
import com.perscholas.budgetorganizer.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends CrudRepository<Transaction, Long> {
    List<Transaction> findByUser(User user);
}
