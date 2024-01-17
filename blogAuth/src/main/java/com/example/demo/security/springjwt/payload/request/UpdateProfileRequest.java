package com.example.demo.security.springjwt.payload.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Set;

public class UpdateProfileRequest {
    @NotBlank
    @Size(min = 0, max = 20)
    private String username;
    @NotBlank
    @Size(min = 0, max = 20)
    private String firstName;

    @NotBlank
    @Size(min = 0, max = 20)
    private String lastName;

    @Size(min = 0, max = 40)
    private String oldPassword;

    @Size(min = 0, max = 40)
    private String newPassword;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
