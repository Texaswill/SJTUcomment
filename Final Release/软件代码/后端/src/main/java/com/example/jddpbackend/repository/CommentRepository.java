package com.example.jddpbackend.repository;

import com.example.jddpbackend.entity.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<CommentEntity, Long>{
    List<CommentEntity> findAllByDishId(Integer dishId);

    List<CommentEntity> findAllByUserId(Integer userId);
}