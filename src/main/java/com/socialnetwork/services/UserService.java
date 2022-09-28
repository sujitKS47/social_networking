package com.socialnetwork.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.socialnetwork.models.User;
import com.socialnetwork.repos.UserRepository;
import com.socialnetwork.utils.StorageService;

@Service
public class UserService {

	@Autowired private UserRepository repo;
	@Autowired private PasswordEncoder passwordEncoder;
	@Autowired private StorageService storage;
	
	public void saveuser(User user,MultipartFile profilepic) {
		String filename=storage.store(profilepic);
		user.setPhoto(filename);
		String pwd=passwordEncoder.encode(user.getPwd());
		user.setPwd(pwd);
		repo.save(user);
	}
	
	public void updateProfile(User user) {
		User current=getAuthenticatedUser();
		current.setContact(user.getContact());
		current.setFname(user.getFname());
		current.setLname(user.getLname());
		current.setCountry(user.getCountry());
		repo.save(current);
	}
	
	public Optional<User> findByUserId(String userid) {
		return repo.findByUserid(userid);
	}
	
	public List<User> findFollowings(){
		return getAuthenticatedUser().getFollowingUsers();
	}
	
	public List<User> findFollowers(){
		return getAuthenticatedUser().getFollowerUsers();
	}
	
	public List<User> searchUsers(String search){
		System.out.println("searching .. "+search);
		return repo.searchUser(search);
	}
	
	public void followUser(int id) {
		User user=getAuthenticatedUser();
		if(user.getId()!=id) {
			User userToFollow=repo.findById(id).get();
			user.getFollowingUsers().add(userToFollow);
			user.setFollowingCount(user.getFollowingCount()+1);
			userToFollow.getFollowerUsers().add(user);
			userToFollow.setFollowerCount(userToFollow.getFollowerCount()+1);
			repo.save(user);
			repo.save(userToFollow);
			System.out.println("user name "+user.getFname()+" "+user.getLname());
		}
	}
	
	public void unfollowUser(int id) {
		User user=getAuthenticatedUser();
		if(user.getId()!=id) {
			User userToFollow=repo.findById(id).get();
			user.getFollowingUsers().remove(userToFollow);
			user.setFollowingCount(user.getFollowingCount()-1);
			userToFollow.getFollowerUsers().remove(user);
			userToFollow.setFollowerCount(userToFollow.getFollowerCount()-1);
			repo.save(user);
			repo.save(userToFollow);
			System.out.println("user name "+user.getFname()+" "+user.getLname());
		}
	}
	
	public final User getAuthenticatedUser() {
        User user = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        System.out.println(user);
        return findByUserId(user.getUserid()).get();
    }
		
}
