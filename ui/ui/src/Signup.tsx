import React, { useState, FormEvent } from 'react';
import './Signup.css'

// REVIEW: File name has a typo (`Signnup.tsx`) while component is `Signup`. Enterprise standards prefer matching names for readability and maintenance.
const Signup = () => {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userNameValidationMsg, setUserNameValidationMsg] = useState("");
    const [emailValidationMsg, setEmailValidationMsg] = useState("");
    const [passwordValidationMsg, setPasswordValidationMsg] = useState("");
    const [signupSuccess, setSignupSuccess] = useState(false);

    const signupValidation = () => {
        const userNameError = userNameValidation(userName);
        const emailError = emailValidation(userEmail);
        const passwordError = createAndConfirmPasswordValidation(password, confirmPassword);

        setUserNameValidationMsg(userNameError);
        setEmailValidationMsg(emailError);
        setPasswordValidationMsg(passwordError);

        return !(userNameError || emailError || passwordError);
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // REVIEW: Prevent form default submission when using client-side submit handling.
        if (!signupValidation()) {
            return;
        }

        const user = {
            userName,
            userEmail,
            password,
            confirmPassword,
        };

        try {
            const response = await fetch('http://localhost:8000/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            // REVIEW: Always handle non-OK responses explicitly in enterprise code.
            if (!response.ok) {
                const errorResponse = await response.text();
                console.error('Signup failed:', errorResponse);
                return;
            }
            const signupResponse = await response.json();
            console.log(signupResponse);
            setSignupSuccess(true);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="signup-form">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    required
                    name="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <span>{userNameValidationMsg}</span>

                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    required
                    name="userEmail"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                />
                <span>{emailValidationMsg}</span>

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                    type="password"
                    id="confirm-password"
                    placeholder="Confirm Password"
                    required
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span>{passwordValidationMsg}</span>

                <button type="submit">Sign Up</button>
            </form>

            {signupSuccess && <div className="signup-success">Signup completed successfully.</div>}
        </div>
    );
};

const userNameValidation = (userName: string): string => {
    if (userName === "" || userName.trim() === "") {
        return "Username is required";
    } else if (!userName.match(/^[a-zA-Z0-9-_\$]+$/)) {
        return "Username can only contain letters, numbers, hyphens(-), underscores(_) and dollar signs($)";
    }
    return "";
}

const emailValidation = (email: string): string => {
    if (email === "" || email.trim() === "") {
        return "Email is required";
    } else if (!email.match(/^[a-zA-Z0-9._+=]+@gmail\.com$/)) {
        return "Email must be a valid Gmail address";
    }
    return "";
}

const createAndConfirmPasswordValidation = (password: string, confirmPassword: string): string => {
    if (password === "" || password.trim() === "") {
        return "Password is required";
    }
    if (confirmPassword === "" || confirmPassword.trim() === "") {
        return "Confirm Password is required";
    }
    if (password !== confirmPassword) {
        return "Passwords do not match";
    }
    return "";
}

export default Signup;
