package com.socialnetwork.dtos;

public class SuccessResponse {
	
	public SuccessResponse(String message) {
		this.message = message;
	}

	private String message;

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
}
