package com.perscholas.budgetorganizer.controller;

import com.perscholas.budgetorganizer.dto.ChangePasswordDto;
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

    @PutMapping("/change-password/{id}")
    public User changePassword(@PathVariable Long id, @RequestBody ChangePasswordDto changePasswordDto) {
        return userService.changePassword(id, changePasswordDto);
    }

    @DeleteMapping("/delete-user/{id}")
    public User deleteUser(@PathVariable Long id) {
        return userService.delete(id);
    }
}
