package com.bookEatingBoogie.dreamGoblin.Repository;

import com.bookEatingBoogie.dreamGoblin.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByUserId(String userId);
}
