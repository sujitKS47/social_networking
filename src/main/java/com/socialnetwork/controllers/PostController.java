package com.socialnetwork.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.socialnetwork.dtos.SuccessResponse;
import com.socialnetwork.models.Post;
import com.socialnetwork.services.PostService;

@CrossOrigin
@RestController
@RequestMapping("/api/posts")
public class PostController {

	@Autowired private PostService service;
	
	@PostMapping
	public ResponseEntity<?> savePost(Post post,MultipartFile pic){
		service.save(post,pic);
		return ResponseEntity.ok(new SuccessResponse("Post saved successfully"));
	}
	
	@PutMapping("{id}")
	public ResponseEntity<?> savePost(@PathVariable("id")int id,@RequestBody Post post){
		post.setId(id);
		service.update(post);
		return ResponseEntity.ok(new SuccessResponse("Post updated successfully"));
	}
	
	@GetMapping("{id}")
	public ResponseEntity<?> getPostDetails(@PathVariable("id")int id){
		return ResponseEntity.ok(service.findById(id));
	}
	
	@GetMapping("/users/{id}")
	public ResponseEntity<?> userPosts(@PathVariable("id")int id){
		return ResponseEntity.ok(service.findByUserid(id));
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<?> deletePost(@PathVariable("id") int id){
		service.deletePost(id);
		return ResponseEntity.ok(new SuccessResponse("Post deleted successfully"));
	}
}
