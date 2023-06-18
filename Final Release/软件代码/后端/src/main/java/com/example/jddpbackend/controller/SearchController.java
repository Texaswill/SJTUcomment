package com.example.jddpbackend.controller;


import com.example.jddpbackend.entity.DishEntity;
import com.example.jddpbackend.repository.DishRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
public class SearchController {
    @Autowired
    private DishRepository dishRepository;
    @RequestMapping("/search")
    List<DishEntity> searchDish(String name){

        String firstCharacter = name.substring(0, 1);
        List<DishEntity> dishEntities = new ArrayList<>();
        dishEntities.add(dishRepository.findAllByName(name));
        List<DishEntity> tmp;
        tmp=dishRepository.findAll();
        tmp.remove(dishRepository.findAllByName(name));
        for (DishEntity dish : tmp) {
            if (dish.getName().contains(firstCharacter)) {
                dishEntities.add(dish);
            }
        }
        return dishEntities;
    }

}
