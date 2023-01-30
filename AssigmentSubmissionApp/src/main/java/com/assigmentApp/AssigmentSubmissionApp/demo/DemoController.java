package com.assigmentApp.AssigmentSubmissionApp.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/demo-controller")
public class DemoController {

	@GetMapping
	public String demo() {
		return "You are in secured part of web page";
	}
}
