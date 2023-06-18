package com.example.jddpbackend.controller;

import com.example.jddpbackend.entity.CommentEntity;
import com.example.jddpbackend.repository.CommentRepository;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class CommentController {
    private final CommentRepository commentRepository;
    @Autowired
    public CommentController(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @PostMapping("/comments/upload")
    public ResponseEntity<String> addComment(@RequestBody CommentEntity comment) {
        try {
            System.out.println("comment id is"+comment.getCommentId()+"   ");
            commentRepository.save(comment);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @RequestMapping("/comments/getAll")
    public List<CommentEntity>GetAllComments() {
        return commentRepository.findAll();
    }
    @RequestMapping("/dishComments/{dishId}")
    public List<CommentEntity>GetDishComments(@PathVariable Integer dishId) {
        return commentRepository.findAllByDishId(dishId);
    }
    @PostMapping("/comments/{commentId}/like")
    public ResponseEntity<CommentEntity> likeComment(@PathVariable Long commentId) {
        CommentEntity comment = commentRepository.findById(commentId).orElse(null);
        if (comment == null) {
            return ResponseEntity.notFound().build();
        }

        // 更新点赞数
        comment.setLikes(comment.getLikes() + 1);
        commentRepository.save(comment);

        return ResponseEntity.ok(comment);
    }

    @PostMapping("/comments/{commentId}/cancelLike")
    public ResponseEntity<String> cancelLike(@PathVariable Long commentId) {
        CommentEntity comment = commentRepository.findById(commentId).orElse(null);
        if (comment == null) {
            return ResponseEntity.notFound().build();
        }

        // 更新点赞数
        comment.setLikes(comment.getLikes() - 1);
        commentRepository.save(comment);

        return ResponseEntity.ok("取消点赞成功");
    }

    @RequestMapping("/getMyCommentsById/{userId}")
    public List<CommentEntity>GetUserComments(@PathVariable Integer userId) {
        return commentRepository.findAllByUserId(userId);
    }

}
