package com.assigmentApp.AssigmentSubmissionApp.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.assigmentApp.AssigmentSubmissionApp.domain.User;
import com.assigmentApp.AssigmentSubmissionApp.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<User> userOpt = userRepository.findByUsername(username);
		return userOpt.orElseThrow(() -> new UsernameNotFoundException("Inavlid credentials"));
	} 

}
