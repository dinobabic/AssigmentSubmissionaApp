package com.assigmentApp.AssigmentSubmissionApp.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.assigmentApp.AssigmentSubmissionApp.filter.JwtFilter;

import jakarta.servlet.http.HttpServletResponse;

@EnableWebSecurity
@Configuration
public class SecurityConfig {
	
	@Autowired
	private JwtFilter jwtFilter;
	@Autowired
	private AuthenticationProvider authenticationProvider;
	
	@Bean
	public SecurityFilterChain filterChin(HttpSecurity http) throws Exception{
		return http
				.csrf().disable()
				.cors().disable()
				.exceptionHandling()
					.authenticationEntryPoint((request, response, ex) ->
						response.sendError(HttpServletResponse.SC_UNAUTHORIZED, ex.getMessage()))
				.and()
				.authorizeHttpRequests()
					.requestMatchers("/api/auth/**").permitAll()
					.anyRequest().authenticated()
				.and()
				.sessionManagement()
					.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				.and()
					.authenticationProvider(authenticationProvider)
					.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
				.build();
	}
}





