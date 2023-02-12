package com.assigmentApp.AssigmentSubmissionApp.service;

import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.assigmentApp.AssigmentSubmissionApp.domain.Assigment;
import com.assigmentApp.AssigmentSubmissionApp.domain.User;
import com.assigmentApp.AssigmentSubmissionApp.enums.AssigmentStatusEnum;
import com.assigmentApp.AssigmentSubmissionApp.enums.AuthorityEnum;
import com.assigmentApp.AssigmentSubmissionApp.repository.AssigmentRepository;

@Service
public class AssigmentService {

	@Autowired
	private AssigmentRepository assigmentRepository;

	public Assigment save(User user) {
		Assigment assigment = new Assigment();
		assigment.setStatus(AssigmentStatusEnum.PENDING_SUBMISSION.getStatus());
		assigment.setNumber(findNextAssigmentToSubmit(user));
		assigment.setUser(user);
		return assigmentRepository.save(assigment);
	}

	private Integer findNextAssigmentToSubmit(User user) {
		Set<Assigment> assigments = assigmentRepository.findByUser(user);
		if (assigments == null) {
			return 1;
		} else {
			Optional<Integer> nextAssigmentNumberOpt = assigments.stream().sorted((a1, a2) -> {
				if (a1.getNumber() == null) {
					return 1;
				}
				if (a2.getNumber() == null) {
					return 1;
				}
				return a2.getNumber().compareTo(a1.getNumber());
			}).map(assigment -> {
				if (assigment.getNumber() == null) {
					return 1;
				}
				return assigment.getNumber() + 1;
			}).findFirst();
			return nextAssigmentNumberOpt.orElse(1);
		}
	}

	public Set<Assigment> findByUser(User user) {
		boolean hasCodeReviewerRole = user.getAuthorities()
		.stream()
		.filter(auth -> AuthorityEnum.ROLE_CODE_REVIEWER.name().equals(auth.getAuthority()))
		.count() > 0;
		
		if (hasCodeReviewerRole) {
			System.out.println(assigmentRepository.findByCodeReviewer(user));
			return assigmentRepository.findByCodeReviewer(user);
		}
		
		return assigmentRepository.findByUser(user);
	}

	public Optional<Assigment> findById(Long assigmentId) {
		return assigmentRepository.findById(assigmentId);
	}

	public Assigment save(Assigment assigment) {
		return assigmentRepository.save(assigment);
	}

}
