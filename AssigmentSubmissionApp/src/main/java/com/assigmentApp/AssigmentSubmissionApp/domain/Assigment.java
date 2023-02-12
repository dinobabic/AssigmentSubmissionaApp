package com.assigmentApp.AssigmentSubmissionApp.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "assigment")
public class Assigment {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;
	
	@Column(name = "status")
	private String status;
	
	@Column(name = "github_url")
	private String githubUrl;
	
	@Column(name = "branch")
	private String branch;
	
	@Column(name = "code_review_video_url")
	private String codeReviewVideoUrl;
	
	@Column(name = "number")
	private Integer number;
	
	@ManyToOne(optional = false)
	private User user;
	
	@ManyToOne
	private User codeReviewer;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getGithubUrl() {
		return githubUrl;
	}

	public void setGithubUrl(String githubUrl) {
		this.githubUrl = githubUrl;
	}

	public String getBranch() {
		return branch;
	}

	public void setBranch(String branch) {
		this.branch = branch;
	}

	public String getCodeReviewVideoUrl() {
		return codeReviewVideoUrl;
	}

	public void setCodeReviewVideoUrl(String codeReviewVideoUrl) {
		this.codeReviewVideoUrl = codeReviewVideoUrl;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Integer getNumber() {
		return number;
	}

	public void setNumber(Integer number) {
		this.number = number;
	}

	public User getCodeReviewer() {
		return codeReviewer;
	}

	public void setCodeReviewer(User codeReviewer) {
		this.codeReviewer = codeReviewer;
	}

	@Override
	public String toString() {
		return "Assigment [id=" + id + ", status=" + status + ", githubUrl=" + githubUrl + ", branch=" + branch
				+ ", codeReviewVideoUrl=" + codeReviewVideoUrl + ", number=" + number + ", user=" + user + "]";
	}
}
