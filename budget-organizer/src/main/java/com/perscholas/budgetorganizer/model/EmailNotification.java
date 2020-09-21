package com.perscholas.budgetorganizer.model;

import org.springframework.stereotype.Component;

@Component
public class EmailNotification {
    private String email;
    private String subject;
    private String messageBody;

    public EmailNotification() {
    }

    public EmailNotification(String email, String subject, String messageBody) {
        this.email = email;
        this.subject = subject;
        this.messageBody = messageBody;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getMessageBody() {
        return messageBody;
    }

    public void setMessageBody(String messageBody) {
        this.messageBody = messageBody;
    }
}

