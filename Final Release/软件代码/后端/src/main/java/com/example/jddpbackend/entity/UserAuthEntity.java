package com.example.jddpbackend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "userauth", schema = "jddp")
public class UserAuthEntity {
    private Integer authId;
    private Integer userId;
    private Integer role;

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "auth_id")
    public Integer getAuthId() {
        return authId;
    }

    public void setAuthId(Integer authId) {
        this.authId = authId;
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
    @Column(name = "role")
    public Integer getRole() {
        return role;
    }

    public void setRole(Integer role) {
        this.role = role;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UserAuthEntity that = (UserAuthEntity) o;

        if (authId != null ? !authId.equals(that.authId) : that.authId != null) return false;
        if (userId != null ? !userId.equals(that.userId) : that.userId != null) return false;
        if (role != null ? !role.equals(that.role) : that.role != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = authId != null ? authId.hashCode() : 0;
        result = 31 * result + (userId != null ? userId.hashCode() : 0);
        result = 31 * result + (role != null ? role.hashCode() : 0);
        return result;
    }
}
