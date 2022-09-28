package com.socialnetwork.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.socialnetwork.config.JwtTokenUtil;
import com.socialnetwork.dtos.AuthResponse;
import com.socialnetwork.dtos.FollowUserDTO;
import com.socialnetwork.dtos.LoginDTO;
import com.socialnetwork.dtos.SuccessResponse;
import com.socialnetwork.models.User;
import com.socialnetwork.services.UserService;

@CrossOrigin
@RestController
@RequestMapping("/api/users")
public class UserController {
	
	private static Logger log = LoggerFactory.getLogger(UserController.class);

	@Autowired AuthenticationManager authManager;
	@Autowired JwtTokenUtil jwtUtil;
	@Autowired private UserService uservice;

	@PostMapping("/validate")
	public ResponseEntity<?> validateUser(@RequestBody LoginDTO dto) {
		try {
			Authentication authentication = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            dto.getUserid(), dto.getPwd())
            );
            User user = (User) authentication.getPrincipal();
            String accessToken = jwtUtil.generateAccessToken(user);
            log.info("auth done "+accessToken+" "+user);
            AuthResponse response = new AuthResponse(user.getUserid(), accessToken,user.getFname()+" "+user.getLname(),user.getId());
             
            return ResponseEntity.ok().body(response);
		}catch(Exception ex) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}
	
	@PostMapping
	public ResponseEntity<?> registerUser(User user,MultipartFile profilepic) {
		uservice.saveuser(user,profilepic);
		return ResponseEntity.ok().body(new SuccessResponse("Registered successfully"));
	}
	
	@GetMapping("/verify")
	public ResponseEntity<?> verifyEmail(String email){
		System.out.println("Received "+email);
		User user= uservice.findByUserId(email).orElse(null);
		return ResponseEntity.ok(user==null);
	}
	
	@PostMapping("/profile")
	public ResponseEntity<?> updateProfile(@RequestBody User user){
		uservice.updateProfile(user);
		return ResponseEntity.ok(new SuccessResponse("Profile updated"));
	}
	
	@GetMapping("/profile")
	public ResponseEntity<?> getProfile(){
		return ResponseEntity.ok(uservice.getAuthenticatedUser());
	}
	
	@GetMapping("/search")
	public ResponseEntity<?> searchUsers(String search,int userid){
		return ResponseEntity.ok(uservice.searchUsers(search));
	}
	
	@PostMapping("/followers")
	public ResponseEntity<?> followUser(@RequestBody FollowUserDTO dto){
		uservice.followUser(dto.getId());
		 return ResponseEntity.ok(new SuccessResponse("follow successfully"));
	}
	
	@DeleteMapping("/followers/{id}")
	public ResponseEntity<?> unfollowUser(@PathVariable("id") int id){
		uservice.unfollowUser(id);
		return ResponseEntity.ok(new SuccessResponse("Unfollow successfully"));
	}
	
	@GetMapping("/followers")
	public ResponseEntity<?> findFollowers(){		
		 return ResponseEntity.ok(uservice.findFollowers());
	}
	
	@GetMapping("/followings")
	public ResponseEntity<?> findFollowings(){
		return ResponseEntity.ok(uservice.findFollowings());
	}
}
