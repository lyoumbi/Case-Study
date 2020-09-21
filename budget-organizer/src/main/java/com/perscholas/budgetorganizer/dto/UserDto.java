package com.perscholas.budgetorganizer.dto;

public class UserDto {
    private String email;

    private Double initialBudget;

    private String firstName;

    private String lastName;

    private String password;

    private String confirmedPassword;

    public UserDto() {
    }

    public UserDto(String email, Double initialBudget, String firstName, String lastName, String password, String confirmedPassword) {
        this.email = email;
        this.initialBudget = initialBudget;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.confirmedPassword = confirmedPassword;
    }

    public UserDto(String email, Double initialBudget, String firstName, String lastName, String password) {
        this.email = email;
        this.initialBudget = initialBudget;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
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

    public String getConfirmedPassword() {
        return confirmedPassword;
    }

    public void setConfirmedPassword(String confirmedPassword) {
        this.confirmedPassword = confirmedPassword;
    }
}
