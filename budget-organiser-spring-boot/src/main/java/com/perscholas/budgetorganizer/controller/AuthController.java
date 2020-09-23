package com.perscholas.budgetorganizer.controller;

import com.perscholas.budgetorganizer.dto.LoginDto;
import com.perscholas.budgetorganizer.dto.UserDto;
import com.perscholas.budgetorganizer.model.User;
import com.perscholas.budgetorganizer.service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public User register(@RequestBody UserDto userDto) {
        return authService.register(userDto);
    }

    @PostMapping("/login")
    public User login(@RequestBody LoginDto loginDto) {
        return authService.authenticateTheUser(loginDto);
    }
}
