package com.perscholas.budgetorganizer.service;

import com.perscholas.budgetorganizer.model.EmailNotification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

import java.util.logging.Logger;

@Service
public class MailService {
    private Logger logger = Logger.getLogger(MailService.class.getName());

    private JavaMailSender mailSender;
    private MailContentBuilderService mailContentBuilderService;

    @Autowired
    public MailService(JavaMailSender mailSender, MailContentBuilderService mailContentBuilderService) {
        this.mailSender = mailSender;
        this.mailContentBuilderService = mailContentBuilderService;
    }

    public void sendEmail(EmailNotification emailNotification) {
        MimeMessagePreparator messagePreparator = mimeMessage -> {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
            messageHelper.setFrom("lyoumbi@budgetorginizer.com");
            messageHelper.setTo(emailNotification.getEmail());
            messageHelper.setSubject(emailNotification.getSubject());
            messageHelper.setText(mailContentBuilderService.buildEmailToSend(emailNotification.getMessageBody()));
        };

        try {
            mailSender.send(messagePreparator);
            logger.info("Email sent!");
        } catch (MailException e) {
            throw new RuntimeException(e);
        }
    }
}
