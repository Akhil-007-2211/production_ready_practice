package com.akhil.demo.controller;

import com.akhil.demo.dto.UserSignupRequestDTO;
import com.akhil.demo.dto.UserSignupResponseDTO;
import com.akhil.demo.service.implementation.UserSignupService;
import com.akhil.demo.service.interfaces.IUserSignupRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserSignupController {
    @Autowired
    private IUserSignupRequest iUserSignupRequest;

    @PostMapping("/signup")
    public ResponseEntity<UserSignupResponseDTO> userSignupRequest(@RequestBody UserSignupRequestDTO userSignupRequest){
        return ResponseEntity.ok(iUserSignupRequest.userSignupRequest(userSignupRequest));
    }
}
