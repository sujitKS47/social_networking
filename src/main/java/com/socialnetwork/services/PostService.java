package com.socialnetwork.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.socialnetwork.models.Post;
import com.socialnetwork.models.User;
import com.socialnetwork.repos.PostRepository;
import com.socialnetwork.utils.StorageService;

@Service
public class PostService {

	@Autowired private PostRepository repo;
	@Autowired private UserService service;
	@Autowired private StorageService storage;
	
	public void save(Post post,MultipartFile pic) {
		if(pic!=null) {
			String filename=storage.store(pic);
			post.setPhoto(filename);
		}
		repo.save(post);
	}
	
	public void update(Post post) {
		Post pp=findById(post.getId());
		pp.setContent(post.getContent());
		repo.save(pp);
	}
	
	public Post findById(int id) {
		return repo.findById(id).get();
	}
	
	public List<Post> findByUserid(int id){
		List<User> followingUsers=service.getAuthenticatedUser().getFollowingUsers();
		List<Integer> followingIds=followingUsers.stream().map(x->x.getId()).collect(Collectors.toList());
		followingIds.add(id);
		return repo.findPostsByUserIdInOrderByIdDesc(followingIds);
	}
	
	public void deletePost(int id) {
		repo.deleteById(id);
	}
}
