package com.perscholas.budgetorganizer.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"email"}))
public class User {

    @Id
    private Long id;

    private String email;

    private Double initialBudget;

    private String firstName;

    private String lastName;

    private String password;

    @JsonIgnore
    @OneToMany
    private List<Transaction> transactions;

    public User() {
    }

    public User(Long id, String email, Double initialBudget, String firstName, String lastName, String password) {
        this.id = id;
        this.email = email;
        this.initialBudget = initialBudget;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
    }


    public User(String email, Double initialBudget, String firstName, String lastName, String password) {
        this.email = email;
        this.initialBudget = initialBudget;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Double getInitialBudget() {
        return initialBudget;
    }

    public void setInitialBudget(Double initialBudget) {
        this.initialBudget = initialBudget;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Transaction> getTransactions() {
        return transactions;
    }

    public void setTransactions(List<Transaction> transactions) {
        this.transactions = transactions;
    }

    @Override
    public String toString() {
        return "User{" +
                "email='" + email + '\'' +
                ", initialBudget=" + initialBudget +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
