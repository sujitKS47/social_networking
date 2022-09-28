package com.socialnetwork.dtos;

public class AuthResponse {

	private String userid;
	private String accessToken;
	private String uname;
	private int uid;
	
	public AuthResponse(String userid, String accessToken, String uname,int uid) {
		this.userid = userid;
		this.accessToken = accessToken;
		this.uname = uname;
		this.uid=uid;
	}
	public AuthResponse() {
		// TODO Auto-generated constructor stub
	}
	
	public int getUid() {
		return uid;
	}
	public void setUid(int uid) {
		this.uid = uid;
	}
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getAccessToken() {
		return accessToken;
	}
	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}

	public String getUname() {
		return uname;
	}
	public void setUname(String uname) {
		this.uname = uname;
	}
	
	
}
