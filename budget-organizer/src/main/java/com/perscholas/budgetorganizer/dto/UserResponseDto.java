package com.perscholas.budgetorganizer.dto;

public class UserResponseDto {
    private String email;

    private Double initialBudget;

    private String firstName;

    private String lastName;

    public UserResponseDto(String email, Double initialBudget, String firstName, String lastName) {
        this.email = email;
        this.initialBudget = initialBudget;
        this.firstName = firstName;
        this.lastName = lastName;
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
}
