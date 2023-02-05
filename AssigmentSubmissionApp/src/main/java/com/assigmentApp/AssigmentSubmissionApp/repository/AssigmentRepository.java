package com.assigmentApp.AssigmentSubmissionApp.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.assigmentApp.AssigmentSubmissionApp.domain.Assigment;
import com.assigmentApp.AssigmentSubmissionApp.domain.User;

public interface AssigmentRepository extends JpaRepository<Assigment, Long> {

	public Set<Assigment> findByUser(User user);
}
