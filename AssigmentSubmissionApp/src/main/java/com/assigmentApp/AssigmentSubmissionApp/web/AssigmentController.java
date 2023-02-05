package com.assigmentApp.AssigmentSubmissionApp.web;

import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.assigmentApp.AssigmentSubmissionApp.domain.Assigment;
import com.assigmentApp.AssigmentSubmissionApp.domain.User;
import com.assigmentApp.AssigmentSubmissionApp.service.AssigmentService;

@RestController
@RequestMapping("/api/assigments")
public class AssigmentController {
	
	@Autowired
	private AssigmentService assigmentService; 
	
	@PostMapping
	public ResponseEntity<?> createAssigment(@AuthenticationPrincipal User user) {
		Assigment assigment = assigmentService.save(user);
		return ResponseEntity.ok(assigment);
	}
	
	@GetMapping
	public ResponseEntity<?> getAssigments(@AuthenticationPrincipal User user) {
		Set<Assigment> assigments = assigmentService.findByUser(user);
		return ResponseEntity.ok(assigments);
	}
	
	@GetMapping("{assigmentId}")
	public ResponseEntity<?> getAssigment(@PathVariable Long assigmentId, @AuthenticationPrincipal User user) {
		Optional<Assigment> assigmentOpt = assigmentService.findById(assigmentId);
		return ResponseEntity.ok(assigmentOpt.orElse(new Assigment()));
	}
	
	@PutMapping("{assigmentId}")
	public ResponseEntity<?> updateAssigment(@RequestBody Assigment assigment, @PathVariable Long assigmentId, @AuthenticationPrincipal User user) {
		return ResponseEntity.ok(assigmentService.save(assigment));
	}
}








