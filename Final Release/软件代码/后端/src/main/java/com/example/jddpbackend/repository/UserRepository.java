package com.example.jddpbackend.repository;

import com.example.jddpbackend.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Long>{
    boolean existsByUsername(String username);

    UserEntity findByUsername(String username);

    UserEntity findByUserId(int userId);
}