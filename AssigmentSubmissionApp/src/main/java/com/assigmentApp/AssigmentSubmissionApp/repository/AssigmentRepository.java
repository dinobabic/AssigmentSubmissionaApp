package com.assigmentApp.AssigmentSubmissionApp.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.assigmentApp.AssigmentSubmissionApp.domain.Assigment;
import com.assigmentApp.AssigmentSubmissionApp.domain.User;

public interface AssigmentRepository extends JpaRepository<Assigment, Long> {

	public Set<Assigment> findByUser(User user);

	@Query("select a from Assigment a where a.status='Submitted' or a.codeReviewer = :codeReviewer")
	public Set<Assigment> findByCodeReviewer(User codeReviewer);
}
