package com.example.jddpbackend.repository;

import com.example.jddpbackend.entity.DishEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;



import java.util.List;

public interface DishRepository extends JpaRepository<DishEntity, Long>{
    DishEntity findByDishId(Integer dishId);

    DishEntity findAllByName(String name);

    List<DishEntity> findAllByLocation(int location);
}