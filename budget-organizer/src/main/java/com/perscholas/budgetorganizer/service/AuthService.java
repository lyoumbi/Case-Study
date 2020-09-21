package com.perscholas.budgetorganizer.service;

import com.perscholas.budgetorganizer.dto.LoginDto;
import com.perscholas.budgetorganizer.dto.UserDto;
import com.perscholas.budgetorganizer.model.User;
import com.perscholas.budgetorganizer.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Comparator;
import java.util.Optional;
import java.util.logging.Logger;

@Service
public class AuthService {
    private Logger logger = Logger.getLogger(AuthService.class.getName());

    private PasswordEncoder passwordEncoder;
    private UserRepository userRepository;
    private UserDetailServiceImpl userDetailService;
    private UserService userService;

//    @Autowired
//    private MailService mailService;

    @Autowired
    public AuthService(PasswordEncoder passwordEncoder, UserRepository userRepository, UserDetailServiceImpl userDetailService, UserService userService) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.userDetailService = userDetailService;
        this.userService = userService;
    }

    @Transactional
    public User register(UserDto userDto) {
        Long lastId = userService.findAll()
                                 .stream()
                                 .map(user -> user.getId())
                                 .max(Comparator.naturalOrder())
                                 .orElseGet(() -> 0L);
        User user = new User();
        if(userDto.getEmail() == "" || userDto.getFirstName() == "" || userDto.getLastName() == "") {
            return null;
        }
        if(userDto.getPassword() != "" && userDto.getPassword().equals(userDto.getConfirmedPassword())) {
            user.setEmail(userDto.getEmail());
            if (userDto.getInitialBudget() != null) {
                user.setInitialBudget(userDto.getInitialBudget());
            } else {
                user.setInitialBudget(0D);
            }
            user.setFirstName(userDto.getFirstName());
            user.setLastName(userDto.getLastName());
            user.setPassword(passwordEncoder.encode(userDto.getPassword()));
            user.setId(lastId + 1);
            userRepository.save(user);
            return user;
        } else {
            return null;
        }
//        mailService.sendEmail(new EmailNotification("myemaill@tmail.com", "My Test", "Testing the Mail trap to gmail."));
    }


    @Transactional
    public User authenticateTheUser(LoginDto loginDto) {
        Optional<User> optionalUser = userRepository.findByEmail(loginDto.getEmail());
        User user = optionalUser.orElseGet(() -> null);
        if(user == null) return null;
        if(passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
            return user;
        } else {
            return null;
        }
    }
}
