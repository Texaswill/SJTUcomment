package com.example.jddpbackend.controller;

import com.example.jddpbackend.entity.UserAuthEntity;
import com.example.jddpbackend.entity.UserEntity;
import com.example.jddpbackend.entity.UserLogin;
import com.example.jddpbackend.repository.UserAuthRepository;
import com.example.jddpbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.jddpbackend.controller.UserRegistrationRequest;

import java.util.*;


@RestController
public class UserController {
    private final UserRepository userRepository;
    private final UserAuthRepository userAuthRepository;

    @Autowired
    public UserController(UserRepository userRepository, UserAuthRepository userAuthRepository) {
        this.userRepository = userRepository;
        this.userAuthRepository = userAuthRepository;
    }

    @CrossOrigin
    @PostMapping("/user/register")
    public ResponseEntity<String> registerUser(@RequestBody UserRegistrationRequest request) {
        // 检查用户名是否已存在
        if (userRepository.existsByUsername(request.getUsername())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("用户名已存在");
        }

        // 创建用户对象并保存到数据库
        UserEntity user = new UserEntity();
        user.setPassword(request.getPassword());
        user.setUsername(request.getUsername());
        userRepository.save(user);

        UserAuthEntity userAuth = new UserAuthEntity();
        userAuth.setUserId(user.getUserId());
        userAuth.setRole(request.getRole());
        userAuthRepository.save(userAuth);

        return ResponseEntity.ok("用户注册成功");
    }

    @CrossOrigin
    @PostMapping("/user/login")
    public ResponseEntity<UserAuthEntity> login(@RequestBody UserLogin loginForm) {
        // 根据用户名从数据库中查找用户信息
        UserEntity user = userRepository.findByUsername(loginForm.getUsername());

        if (user == null) {
            // 用户不存在
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        // 校验密码
        if (!user.getPassword().equals(loginForm.getPassword())) {
            // 密码错误
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }

        // 登录成功
        UserAuthEntity userAuth = userAuthRepository.findByUserId(user.getUserId());
        return ResponseEntity.ok(userAuth);
    }
    @CrossOrigin
    @GetMapping("/user/{id}")
    public ResponseEntity<UserEntity> getUserById(@PathVariable("id") Long userId) {
        // 根据 userId 从数据库中查找用户信息
        Optional<UserEntity> optionalUserEntity = userRepository.findById(userId);

        if (optionalUserEntity.isPresent()) {
            // 用户存在，返回 username 和 password
            UserEntity userEntity = optionalUserEntity.get();

            return ResponseEntity.ok(userEntity);
        } else {
            // 用户不存在
            //System.out.print("lkjlkjlkjlj");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @CrossOrigin
    @GetMapping("user/getById/{userId}")
    public UserEntity getUserById(@PathVariable int userId) {
        return userRepository.findByUserId(userId);
    }

    @CrossOrigin
    @PostMapping("/user/modify")
    public ResponseEntity<String> modifyUser(@RequestBody UserEntity request) {
        // 检查用户名是否已存在
        if (userRepository.existsByUsername(request.getUsername())) {
            UserEntity another = userRepository.findByUsername(request.getUsername());
            if (!Objects.equals(another.getUserId(), request.getUserId()))
                return ResponseEntity.status(HttpStatus.CONFLICT).body("用户名已存在");
        }

        // 创建用户对象并保存到数据库
        UserEntity user = userRepository.findByUserId(request.getUserId());
        user.setPassword(request.getPassword());
        user.setUsername(request.getUsername());
        user.setIntro(request.getIntro());
        userRepository.save(user);

        return ResponseEntity.ok("用户信息修改成功");
    }
}

