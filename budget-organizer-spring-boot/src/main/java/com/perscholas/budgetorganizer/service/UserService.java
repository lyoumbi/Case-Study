package com.perscholas.budgetorganizer.service;

import com.perscholas.budgetorganizer.dto.ChangePasswordDto;
import com.perscholas.budgetorganizer.model.User;
import com.perscholas.budgetorganizer.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.logging.Logger;
import java.util.List;

@Service
public class UserService {

    Logger logger = Logger.getLogger(UserService.class.getName());

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> findAll() {
        Iterable<User> iterable = userRepository.findAll();
        List<User> userList = new ArrayList<>();
        iterable.forEach(userList::add);
        return userList;
    }

    public User delete(Long id) {
        User currUser = userRepository.findById(id).get();
        userRepository.delete(currUser);
        return currUser;
    }

    public User changePassword(Long id, ChangePasswordDto changePasswordDto) {
        User currUser = userRepository.findById(id).orElseGet(() -> null);
        if(currUser == null) return null;
        if(passwordEncoder.matches(changePasswordDto.getCurrentPassword(), currUser.getPassword()) &&
            changePasswordDto.getNewPassword().equals(changePasswordDto.getConfirmPassword())) {
                currUser.setPassword(passwordEncoder.encode(changePasswordDto.getNewPassword()));
        } else {
            return null;
        }
        return userRepository.save(currUser);
    }
}
