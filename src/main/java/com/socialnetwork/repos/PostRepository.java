package com.socialnetwork.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.socialnetwork.models.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
	List<Post> findByUserId(int id);
	List<Post> findPostsByUserIdInOrderByIdDesc(List<Integer> followingUserIds);
}
