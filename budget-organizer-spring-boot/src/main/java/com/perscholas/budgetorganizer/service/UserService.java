package com.perscholas.budgetorganizer.service;

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

    public User updatePassword(Long id, User user) {
        User currUser = userRepository.findById(id).get();
        currUser.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(currUser);
    }
}
