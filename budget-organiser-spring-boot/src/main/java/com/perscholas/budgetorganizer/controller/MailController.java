package com.perscholas.budgetorganizer.controller;


import com.perscholas.budgetorganizer.dto.MailDto;
import com.perscholas.budgetorganizer.model.EmailNotification;
import com.perscholas.budgetorganizer.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSendException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/mail")
public class MailController {

    private MailService mailService;

    @Autowired
    public MailController(MailService mailService) {
        this.mailService = mailService;
    }

    @PostMapping("/send")
    public boolean sendEmail(@RequestBody MailDto mailDto){
        if(mailDto.getEmail().equals("")) return false;
        if(mailDto.getSubject().equals("")) return false;
        if(mailDto.getMessage().equals("")) return false;

        try {
            mailService.sendEmail(new EmailNotification(mailDto.getEmail(), mailDto.getSubject(), mailDto.getMessage()));
            return true;
        } catch (MailSendException e) {
            return false;
        }

    }
}
