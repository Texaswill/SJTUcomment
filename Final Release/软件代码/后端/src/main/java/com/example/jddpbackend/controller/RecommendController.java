package com.example.jddpbackend.controller;
import com.example.jddpbackend.entity.UserEntity;
import com.example.jddpbackend.repository.RecommendRepository;
import com.example.jddpbackend.Service.RecommendService;
import com.example.jddpbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.jddpbackend.entity.DishEntity;
import java.util.List;
@RestController
public class RecommendController {
    @Autowired
    private  RecommendRepository foodRepository;

    @Autowired
    private UserRepository userRepository;
    private DishEntity me;
    @Autowired
    private RecommendService recommendService;
    @RequestMapping("/getFood")
    List<DishEntity> getFood(){
        List<DishEntity> result;
        result = (List<DishEntity>) foodRepository.findAll();
        return result;
    }
    @CrossOrigin
    @RequestMapping("/cardListData")
    List<DishEntity> getRecommend(int id){

        UserEntity user=userRepository.findByUserId(id);
        return recommendService.getRecommend(user);
    }

    @Autowired
    public RecommendController(RecommendService recommendService) {
        this.me = new DishEntity();
        this.me.setLocation(1);
        this.me.setPrice(15);
        this.me.setTaste(2);
        this.me.setType(3);
        this.recommendService = recommendService;
    }
}
