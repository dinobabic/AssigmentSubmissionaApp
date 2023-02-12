package com.assigmentApp.AssigmentSubmissionApp.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum AssigmentEnum {
	ASSIGMENT_1(1, "HTML Assigment"),
	ASSIGMENT_2(2, "Guessing Game"),
	ASSIGMENT_3(3, "User Login"),
	ASSIGMENT_4(4, "Student Course List"),
	ASSIGMENT_5(5, "Custom Array List"),
	ASSIGMENT_6(6, "Reports with Streams"),
	ASSIGMENT_7(7, "Unit Testing"),
	ASSIGMENT_8(8, "Multi-threading"),
	ASSIGMENT_9(9, "Spring MVC"),
	ASSIGMENT_10(10, "RESTful Service"),
	ASSIGMENT_11(11, "Full Stack with Thymeleaf"),
	ASSIGMENT_12(12, "Reports with SQL"),
	ASSIGMENT_13(13, "Online Bank"),
	ASSIGMENT_14(14, "Chatting with JS");
	
	private int assigmentNumber;
	private String assigmentName;
	
	AssigmentEnum(int assigmentNumber, String assigmentName) {
		this.assigmentNumber = assigmentNumber;
		this.assigmentName = assigmentName;
	}

	public int getAssigmentNumber() {
		return assigmentNumber;
	}

	public String getAssigmentName() {
		return assigmentName;
	}
}
