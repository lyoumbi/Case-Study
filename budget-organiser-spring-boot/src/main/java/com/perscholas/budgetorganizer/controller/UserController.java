package com.perscholas.budgetorganizer.controller;

import com.perscholas.budgetorganizer.model.User;
import com.perscholas.budgetorganizer.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PutMapping("/update-password/{id}")
    public User updatePassword(@RequestBody Long id, @RequestBody User user) {
        return userService.updatePassword(id, user);
    }

    @DeleteMapping("/delete-user/{id}")
    public User deleteUser(@RequestBody Long id) {
        return userService.delete(id);
    }
}
