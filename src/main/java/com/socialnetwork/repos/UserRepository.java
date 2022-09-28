package com.socialnetwork.repos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.socialnetwork.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

	Optional<User> findByUserid(String userid);
	List<User> findUsersByFollowerUsers(User user);
    List<User> findUsersByFollowingUsers(User user);
    @Query(value = "select * from users where fname ilike %?1% or lname ilike %?1% or userid ilike %?1%",nativeQuery = true)
    List<User> searchUser(String search);
}
