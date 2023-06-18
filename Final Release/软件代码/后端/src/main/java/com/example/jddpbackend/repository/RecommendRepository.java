package com.example.jddpbackend.repository;
import com.example.jddpbackend.entity.DishEntity;
import org.springframework.data.repository.CrudRepository;



public interface RecommendRepository  extends CrudRepository<DishEntity, Long> {
}
