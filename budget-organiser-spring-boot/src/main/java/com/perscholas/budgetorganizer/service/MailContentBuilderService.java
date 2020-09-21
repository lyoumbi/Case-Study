package com.perscholas.budgetorganizer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class MailContentBuilderService {

    private TemplateEngine templateEngine;

    @Autowired
    public MailContentBuilderService(TemplateEngine templateEngine) {
        this.templateEngine = templateEngine;
    }

    public String buildEmailToSend(String message) {
        Context context = new Context();
        context.setVariable("message", message);
        return templateEngine.process("mail-template", context);
    }

}
