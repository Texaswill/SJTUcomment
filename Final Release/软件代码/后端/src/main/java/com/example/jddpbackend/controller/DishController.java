package com.example.jddpbackend.controller;
import com.example.jddpbackend.entity.DishEntity;
import com.example.jddpbackend.repository.DishRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/dish")
public class DishController {
    private final DishRepository dishRepository;

    @Autowired
    public DishController(DishRepository dishRepository) {
        this.dishRepository = dishRepository;
    }
    @RequestMapping("/{dishId}")
    public DishEntity getDishByDishId(@PathVariable Integer dishId) {
        return dishRepository.findByDishId(dishId);
    }
    @PostMapping
    public ResponseEntity<String> createDish(@RequestBody DishEntity dish) {
        try {
            dish.setHot(0);
            //dish.init();
            DishEntity savedDish = dishRepository.save(dish);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedDish.getDishId().toString());
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create dish");
        }
    }

    @RequestMapping("/restaurant")
    public List<DishEntity> getByLocation(int name){
        //int a=Integer.parseInt(location);
        //System.out.println(name);
        return dishRepository.findAllByLocation(name);
    }
}
