package com.akhil.demo.service.implementation;

import com.akhil.demo.dto.UserSignupRequestDTO;
import com.akhil.demo.dto.UserSignupResponseDTO;
import com.akhil.demo.entity.Users;
import com.akhil.demo.repository.UsersRepository;
import com.akhil.demo.service.interfaces.IUserSignupRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserSignupService implements IUserSignupRequest {

    private final UserSignupRequestDTO userSignupRequestDTO;
	@Autowired
    private UsersRepository usersSignupRepository;

	UserSignupService(UserSignupRequestDTO userSignupRequestDTO) {
		this.userSignupRequestDTO = userSignupRequestDTO;
	}

    @Override
    public UserSignupResponseDTO userSignupRequest(UserSignupRequestDTO userSignupRequestDTO) {
        UserSignupResponseDTO userSignupResponseDTO = new UserSignupResponseDTO();
        userSignupResponseDTO.setUserName(validateUserName(userSignupRequestDTO.getUserName()));
        userSignupResponseDTO.setUserEmail(validateUserEmail(userSignupRequestDTO.getUserEmail()));
        userSignupResponseDTO.setPassword(validateCreateAndConfirmPassword(userSignupRequestDTO.getPassword(),userSignupRequestDTO.getConfirmPassword()));
        if(userSignupResponseDTO.getUserName().isEmpty() &&
        userSignupResponseDTO.getUserEmail().isEmpty()&&
        userSignupResponseDTO.getPassword().isEmpty()){
            Users user = new Users();
            user.setUserName(userSignupRequestDTO.getUserName());
            user.setUserEmail(userSignupRequestDTO.getUserEmail());
            user.setPassword(userSignupRequestDTO.getPassword());
            usersSignupRepository.save(user);
        }
        return userSignupResponseDTO;
    }


    
    public String validateUserName(String userName){
        if(userName == null){
            return "UserName Cannot be Empty";
        } else if (userName.contains("^[a-zA-Z0-9_$-]+$")) {
            return "Username cannot contain symbols other than these _,-,$";
        } else if (userNameExists(userName)) {
            return "This username is already taken";
        } else{
            return "";
        }
    }

    public String validateUserEmail(String userEmail){
        if(userEmail == null){
            return "Email Cannot be Null";
        }else if(!userEmail.contains("@gmail.com")){
            return "Email is not valid";
        }
        else if(userEmailExists(userEmail)){
            return "Email is already registered";
        }else{
            return "";
        }
    }

    public String validateCreateAndConfirmPassword(String createPassword,String confirmPassword){
        if(!createPassword.equals(confirmPassword)){
            return "Password Doesn't Match";
        }
        return "";
    }

    public Boolean userNameExists(String userName){
        if(usersSignupRepository.findUsersByUserName(userName)!=null){
            return true;
        }
        return false;
    }

    public Boolean userEmailExists(String userEmail){
        if(usersSignupRepository.findUsersByUserEmail(userEmail)!= null){
            return true;
        }else{
            return false;
        }
    }


}
