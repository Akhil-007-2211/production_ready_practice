import React, { useState } from 'react';
import './Signup.css'
let Signup = async ()=>{
    let [userName,setUserName] = useState("");
    let [userEmail,setUserEmail] = useState("");
    let [password,setPassword] = useState("");
    let [confirmPassword,setConfirmPassword] = useState("");
    let [userNameValidationMsg,setUserNameValidationMsg] = useState("");
    let [emailValidationMsg,setEmailValidationMsg] = useState("");
    let [passwordValidationMsg,setPasswordValidationMsg] = useState("");
    let [signup,setSignup] = useState(false);

    let signupValidation = ()=>{
        setUserNameValidationMsg(userNameValidation(userName));
        setEmailValidationMsg(emailValidation(userEmail));
        setPasswordValidationMsg(createAndConfirmPasswordValidation(password, confirmPassword));
        if(userNameValidationMsg === "" && emailValidationMsg === "" && passwordValidationMsg === ""){
            setSignup(true);
        }        
    }

   if(signup){
         const user = {
            userName,
            userEmail,
            password,
            confirmPassword 
         };

         try{
            const response = await fetch('http:localhost:8000/api/users/signup',
                    {
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify(user)
                    });
                if(response.ok){
                    const signupResponse = await response.json();
                    console.log(signupResponse);
                }
            }
            

   }    
   

    return (
        <div>
            <form action="/signup" method="post" className="signup-form">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" placeholder="Username" required name="userName"
                value={userName} onChange={(e)=>setUserName(e.target.value)}
                />
                <span>{userNameValidationMsg}</span>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Email" required name="userEmail"
                value={userEmail} onChange={(e)=>setUserEmail(e.target.value)}
                />
                <span>{emailValidationMsg}</span>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Password" required name="password"
                value={password} onChange={(e)=>setPassword(e.target.value)}
                />
                <label htmlFor="confirm-password">Confirm Password</label>
                <input type="password" id="confirm-password" placeholder="Confirm Password" required name="confirmPassword"
                value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}
                />
                <span>{passwordValidationMsg}</span>
                <button type="submit" onSubmit={signupValidation}>Sign Up</button>
            </form>
        </div>
    )
}

let userNameValidation = (userName:string):string=>{
    if(userName === "" || userName.trim() === ""){
        return "Username is required";
    }else if(!userName.match("^[a-zA-Z0-9-_$]+$")){
        return "Username can only contain letters, numbers, hyphens(-), underscores(_) and dollar signs($)";
    }
    return "";
}

let emailValidation = (email:string):string=>{
    if(email === "" || email.trim() === ""){
        return "Email is required";
    }else if(!email.match("^[a-zA-Z0-9._+=]+@gmail.com$")){
        return "Email must be a valid Gmail address";
    }
    return "";
}

let createAndConfirmPasswordValidation = (password:string,confirmPassword:string):string=>{
    if(password === "" || password.trim() === ""){
        return "Password is required";
    }
    if(confirmPassword === "" || confirmPassword.trim() === ""){
        return "Confirm Password is required";
    }
    if(password !== confirmPassword){
        return "Passwords do not match";
    }
    return "";
}
}

export default Signup;