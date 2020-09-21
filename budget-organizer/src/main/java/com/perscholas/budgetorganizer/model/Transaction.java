package com.perscholas.budgetorganizer.model;

import javax.persistence.*;

@Entity
public class Transaction {

    @Id
    private Long id;

    private String type;

    private String transactionType;

    private String description;

    private String location;

    private String date;

    private Double amount;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Transaction() {
    }

    public Transaction(String type, String transactionType, String description, String location, String date, Double amount) {
        this.type = type;
        this.transactionType = transactionType;
        this.description = description;
        this.location = location;
        this.date = date;
        this.amount = amount;
    }

    public Transaction(Long id, String type, String transactionType, String description, String location, String date, Double amount) {
        this(type, transactionType, description, location, date, amount);
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Transaction{" +
                "id=" + id +
                ", type='" + type + '\'' +
                ", transactionType='" + transactionType + '\'' +
                ", description='" + description + '\'' +
                ", location='" + location + '\'' +
                ", date='" + date + '\'' +
                ", amount=" + amount +
                '}';
    }
}
