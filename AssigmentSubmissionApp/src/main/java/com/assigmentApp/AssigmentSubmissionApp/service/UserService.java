package com.assigmentApp.AssigmentSubmissionApp.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.assigmentApp.AssigmentSubmissionApp.domain.User;
import com.assigmentApp.AssigmentSubmissionApp.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	public Optional<User> findUserByUsername(String username) {
		return userRepository.findByUsername(username);
	}
}
