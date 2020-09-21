package com.perscholas.budgetorganizer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.Collections;
import java.util.Map;
import java.util.logging.Logger;

@SpringBootApplication
public class BudgetOrganizerApplication {
	public static void main(String[] args) {
		SpringApplication.run(BudgetOrganizerApplication.class, args);
	}
}
