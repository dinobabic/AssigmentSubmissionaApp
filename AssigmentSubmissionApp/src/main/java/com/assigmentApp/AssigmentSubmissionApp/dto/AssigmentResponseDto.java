package com.assigmentApp.AssigmentSubmissionApp.dto;

import java.util.ArrayList;
import java.util.List;

import com.assigmentApp.AssigmentSubmissionApp.domain.Assigment;
import com.assigmentApp.AssigmentSubmissionApp.enums.AssigmentEnum;
import com.assigmentApp.AssigmentSubmissionApp.enums.AssigmentStatusEnum;

public class AssigmentResponseDto {
	
	private Assigment assigment;
	private AssigmentEnum[] assigmentEnums = AssigmentEnum.values();
	private AssigmentStatusEnum[] statusEnums = AssigmentStatusEnum.values();
	
	public AssigmentResponseDto(Assigment assigment) {
		this.assigment = assigment;
	}
	
	public Assigment getAssigment() {
		return assigment;
	}
	public void setAssigment(Assigment assigment) {
		this.assigment = assigment;
	}

	public AssigmentEnum[] getAssigmentEnums() {
		return assigmentEnums;
	}

	public AssigmentStatusEnum[] getStatusEnums() {
		return statusEnums;
	}
}
