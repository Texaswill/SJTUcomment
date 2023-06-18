package com.example.jddpbackend.repository;

import com.example.jddpbackend.entity.UserAuthEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAuthRepository extends JpaRepository<UserAuthEntity, Long>{
    UserAuthEntity findByUserId(Integer userId);
}