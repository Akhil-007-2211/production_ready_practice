package com.akhil.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserSignupRequestDTO {
    private String userName;
    private String userEmail;
    private String password;
    private String confirmPassword;
}
