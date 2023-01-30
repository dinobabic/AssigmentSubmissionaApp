package com.assigmentApp.AssigmentSubmissionApp.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.assigmentApp.AssigmentSubmissionApp.domain.User;
import com.assigmentApp.AssigmentSubmissionApp.repository.UserRepository;
import com.assigmentApp.AssigmentSubmissionApp.util.JwtUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
	
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private JwtUtil jwtUtil;
	@Autowired
	private AuthenticationManager authenticationManager;
	
	public AuthenticationResponse register(RegisterRequest request) {
		User user = new User(request.getUsername(), passwordEncoder.encode(request.getPassword()));
		userRepository.save(user);
		String token = jwtUtil.generateToken(user);
		return AuthenticationResponse.builder()
				.token(token)
				.build();
	}
	
	public AuthenticationResponse authenticate(AuthenticationRequest request) {
		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
				);
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		User user = userRepository.findByUsername(request.getUsername()).orElseThrow();
		String token = jwtUtil.generateToken(user);
		return AuthenticationResponse.builder().token(token).build();
	}
}











