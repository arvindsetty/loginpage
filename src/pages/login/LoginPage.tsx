import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import PasswordStrengthBar from "react-password-strength-bar";
import fieldaLogo from "../../assets/fielda-logo1.png";
import loginImage from "../../assets/Vector-Smart-Object.svg";
import "../login/LoginPage.css";
import { Slide,toast, ToastContainer } from 'react-toastify';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordInputFocused, setIsPasswordInputFocused] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [, setLoginData] = useState({});

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };
  const handlePasswordInputFocus = () => {
    setIsPasswordInputFocused(true);
  };

  const handlePasswordInputBlur = () => {
    setIsPasswordInputFocused(true);
  };
    const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleSubmit = () => {
    // Check for email and password presence
    if (!email) {
      setEmailError('Please enter your email');
    }
    else if (!validateEmail()) {
      setEmailError('Please enter a valid email address');
    } 
    else {
      setEmailError('');
    }
    if (!password) {
      setPasswordError('Please enter your password');
    } else {
      setPasswordError('');
    }
    if (!emailError && !passwordError) {
      const loginuser = {
        email: email,
        password: password,
      }
      console.log(loginuser)
      fetch(`https://staging3.api-next.fielda.com/v1/user/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginuser),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error("Login failed");


        }
        return response.json();
      })
      .then(data => {
        console.log("Login successfully");
        setLoginData(data);
        console.log(data);
        toast.success('LoggedIn Successfully');
        sessionStorage.setItem('email', data.email);
        sessionStorage.setItem('token', data.token);
        window.location.href = '/Dashboard';
      })
      .catch(error => {
        toast.error("Invalid Credentials");
        console.error("login error in:", error);
      })
    }
  };
  return (
    <>
      <div className="login-body">
        <div className="left">
          <img src={fieldaLogo} alt="Logo" id="fieldaLogo" />
          <img src={loginImage} alt="Login" id="loginImage" />
          <h1>A complete solution for all your field operations.</h1>
        </div>
        <div className="right">
          <div className="login-form">
            <h1
              id="loginText"
            >
              Sign In
            </h1>
            <h3 id="subHeadline">Welcome back! Please enter email id and password</h3>
            <div className="form-group field">
              <input
                type="email"
                className="form-field"
                placeholder=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="email" className="form-label">
                Email Id
              </label>
              {emailError && <div className="error-message">{emailError}</div>}
            </div>
            <br />
            <div className="form-group field">
              <input
                type={showPassword ? "text" : "password"}
                className="form-field"
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={handlePasswordInputFocus}
                onBlur={handlePasswordInputBlur}
                required
              />
              <div className="password-toggle" onClick={handlePasswordToggle}>
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              {isPasswordInputFocused && (
                <PasswordStrengthBar password={password} />
              )}
              {passwordError && <div className="error-message">{passwordError}</div>}
            </div>
            <p id="forgotPwd">Forgot Password ?</p>
            <button className="login-button" onClick={handleSubmit}>Log In</button>
            <p id="registerPara">
              <i>Don't have an account ? </i>&nbsp;<b>Sign Up</b>
            </p>
          </div>
        </div>
        <ToastContainer transition={Slide}/>
      </div>
    </>
  );
};

export default LoginPage;
