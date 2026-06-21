package com.akhil.demo.service.interfaces;

import com.akhil.demo.dto.UserSignupRequestDTO;
import com.akhil.demo.dto.UserSignupResponseDTO;
import org.springframework.stereotype.Service;


public interface IUserSignupRequest {

    public UserSignupResponseDTO userSignupRequest(UserSignupRequestDTO userSignupRequestDTO);
}
