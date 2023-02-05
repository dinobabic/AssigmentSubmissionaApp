package com.assigmentApp.AssigmentSubmissionApp.service;

import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.assigmentApp.AssigmentSubmissionApp.domain.Assigment;
import com.assigmentApp.AssigmentSubmissionApp.domain.User;
import com.assigmentApp.AssigmentSubmissionApp.repository.AssigmentRepository;

@Service
public class AssigmentService {

	@Autowired
	private AssigmentRepository assigmentRepository;
	
	public Assigment save(User user) {
		Assigment assigment = new Assigment();
		assigment.setStatus("Needs to be Submitted");
		assigment.setUser(user);
		return assigmentRepository.save(assigment);
	}
	
	public Set<Assigment> findByUser(User user) {
		return assigmentRepository.findByUser(user);
	}

	public Optional<Assigment> findById(Long assigmentId) {
		return assigmentRepository.findById(assigmentId);
	}

	public Assigment save(Assigment assigment) {
		return assigmentRepository.save(assigment);
	}

}
