package com.example.jddpbackend.controller;

public class UserRegistrationRequest {
    private String username;
    private String password;
    private String role;

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public Integer getRole() {
        System.out.print(role);
        switch (role) {
            case "user" -> {
                return 0;
            }
            case "staff" -> {
                return 1;
            }
            case "administrator" -> {
                return 2;
            }
            default -> {
                return -1;
            }
        }
    }
}
