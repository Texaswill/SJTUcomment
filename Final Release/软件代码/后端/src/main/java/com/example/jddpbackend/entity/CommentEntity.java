package com.example.jddpbackend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "comments", schema = "jddp")
public class CommentEntity {
    private Integer commentId;
    private Integer userId;
    private String content;
    private Integer rate;
    private String timeStamp;
    private Integer likes;
    private Integer dishId;

    private String picUrl;
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "comment_id")
    public Integer getCommentId() {
        return commentId;
    }

    public void setCommentId(Integer commentId) {
        this.commentId = commentId;
    }

    @Basic
    @Column(name = "user_id")
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    @Basic
    @Column(name = "content")
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Basic
    @Column(name = "rate")
    public Integer getRate() {
        return rate;
    }

    public void setRate(Integer rate) {
        this.rate = rate;
    }

    @Basic
    @Column(name = "time_stamp")
    public String getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(String timeStamp) {
        this.timeStamp = timeStamp;
    }

    @Basic
    @Column(name = "likes")
    public Integer getLikes() {
        return likes;
    }

    public void setLikes(Integer likes) {
        this.likes = likes;
    }

    @Basic
    @Column(name = "dish_id")
    public Integer getDishId() {
        return dishId;
    }

    public void setDishId(Integer dishId) {
        this.dishId = dishId;
    }

    @Basic
    @Column(name = "pic_url")
    public String getPicUrl() { return picUrl; }

    public void setPicUrl(String picUrl) { this.picUrl = picUrl;}

        @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        com.example.jddpbackend.entity.CommentEntity that = (com.example.jddpbackend.entity.CommentEntity) o;

        if (commentId != null ? !commentId.equals(that.commentId) : that.commentId != null) return false;
        if (userId != null ? !userId.equals(that.userId) : that.userId != null) return false;
        if (content != null ? !content.equals(that.content) : that.content != null) return false;
        if (rate != null ? !rate.equals(that.rate) : that.rate != null) return false;
        if (timeStamp != null ? !timeStamp.equals(that.timeStamp) : that.timeStamp != null) return false;
        if (likes != null ? !likes.equals(that.likes) : that.likes != null) return false;
        if (dishId != null ? !dishId.equals(that.dishId) : that.dishId != null) return false;
        if (picUrl != null ? !picUrl.equals(that.picUrl) : that.picUrl != null) return false;
        return true;
    }

    @Override
    public int hashCode() {
        int result = commentId != null ? commentId.hashCode() : 0;
        result = 31 * result + (userId != null ? userId.hashCode() : 0);
        result = 31 * result + (content != null ? content.hashCode() : 0);
        result = 31 * result + (rate != null ? rate.hashCode() : 0);
        result = 31 * result + (timeStamp != null ? timeStamp.hashCode() : 0);
        result = 31 * result + (likes != null ? likes.hashCode() : 0);
        result = 31 * result + (dishId != null ? dishId.hashCode() : 0);
        result = 31 * result + (picUrl != null ? picUrl.hashCode() : 0);
        return result;
    }
}
