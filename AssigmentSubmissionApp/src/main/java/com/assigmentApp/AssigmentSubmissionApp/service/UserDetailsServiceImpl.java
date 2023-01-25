package com.assigmentApp.AssigmentSubmissionApp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.assigmentApp.AssigmentSubmissionApp.domain.User;
import com.assigmentApp.AssigmentSubmissionApp.util.CustomPasswordEncoder;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private CustomPasswordEncoder passwordEncoder;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = new User();
		user.setUsername(username);
		user.setPassword(passwordEncoder.getPasswordEncoder().encode("123"));
		user.setId(1L);
		return user;
	}

}
