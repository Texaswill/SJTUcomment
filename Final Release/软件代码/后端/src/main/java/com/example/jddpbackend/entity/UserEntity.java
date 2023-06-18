package com.example.jddpbackend.entity;

import jakarta.persistence.*;

import java.util.Random;

@Entity
@Table(name = "user", schema = "jddp", catalog = "")
public class UserEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "user_id")
    private Integer userId;
    @Basic
    @Column(name = "username")
    private String username;
    @Basic
    @Column(name = "password")
    private String password;
    @Basic
    @Column(name = "price")
    private int price;
    @Basic
    @Column(name = "location")
    private int location;
    @Basic
    @Column(name = "type")
    private int type;
    @Basic
    @Column(name = "taste")
    private int taste;

    @Basic
    @Column(name = "intro")
    private String intro;

    public int getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getLocation() {
        return location;
    }

    public void setLocation(Integer location) {
        this.location = location;
    }

    public void setLocation(int location) {
        this.location = location;
    }

    public int getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public int getTaste() {
        return taste;
    }

    public void setTaste(Integer taste) {
        this.taste = taste;
    }

    public void setTaste(int taste) {
        this.taste = taste;
    }

    public void setIntro(String intro) {
        this.intro = intro;
    }

    public String getIntro() {
        return this.intro;
    }

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "user_id")
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    @Basic
    @Column(name = "username")
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Basic
    @Column(name = "password")
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UserEntity that = (UserEntity) o;

        if (userId != null ? !userId.equals(that.userId) : that.userId != null) return false;
        if (username != null ? !username.equals(that.username) : that.username != null) return false;
        if (password != null ? !password.equals(that.password) : that.password != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = userId != null ? userId.hashCode() : 0;
        result = 31 * result + (username != null ? username.hashCode() : 0);
        result = 31 * result + (password != null ? password.hashCode() : 0);
        return result;
    }
    public UserEntity(){
        Random random = new Random();
        this.location= random.nextInt(8);
        this.price= random.nextInt(39);
        this.taste= random.nextInt(4);
        this.type= random.nextInt(5);
    }
}
