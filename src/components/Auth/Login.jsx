import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios"; // Make sure to install axios if not already done
import {
  Container,
  MainContainer,
  SignInContainer,
  SignUpContainer,
  Form,
  Title,
  Input,
  Button,
  GhostButton,
  OverlayContainer,
  Overlay,
  LeftOverlayPanel,
  RightOverlayPanel,
  Select,
  OverlayText,
} from "./StyledComponents";
import "./Auth.css";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
    role: "SHOP KEEPER",
  });
  const [signupData, setSignupData] = useState({
    username: "",
    password: "",
    role: "SHOP KEEPER", // Default role for signup
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, signup } = useAuth();

  // SignIn handler with POST API call
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);

      // Prepare data for the POST request
      const signInData = {
        username: loginData.username,
        password: loginData.password,
        role: loginData.role,
        status: 1, // Assuming active status
      };

      // Make the POST request to the login API
      const response = await axios.post('http://localhost:9099/person/login', signInData);

      // Handle response
      if (response.status === 200 || response.status === 201) {
        console.log("User logged in successfully:", response.data);
        const user = response.data; // Assuming response contains user data
        const { token } = response.data;
         localStorage.setItem('authToken', token);

        // Optionally store other user info (if needed)
        localStorage.setItem('userRole', loginData.role);
        // Navigate based on role
        navigate(user.role === "ADMIN" ? "/admin/dashboard" : "/shopkeeper/dashboard");
      } else {
        throw new Error("Failed to sign in");
      }
    } catch (err) {
      setError("Failed to sign in");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // SignUp handler with POST API call
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);

      // Prepare data for the POST request
      const newUser = {
        username: signupData.username,
        password: signupData.password,
        role: signupData.role, // Role from the dropdown
        status: 1, // Assuming active status
      };

      // Make the POST request to the register API
      const response = await axios.post('http://localhost:9099/person/register', newUser);

      // Handle response
      if (response.status === 200 || response.status === 201) {
        console.log("User registered successfully:", response.data);
        setIsSignIn(true); // Switch to Sign In form after successful registration
        setSignupData({ username: "", password: "", role: "SHOP KEEPER" }); // Reset signup form
      } else {
        throw new Error("Failed to create account");
      }
    } catch (err) {
      setError("Failed to create account");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <MainContainer>
        {/* SignUp Container */}
        <SignUpContainer signingIn={isSignIn}>
          <Form onSubmit={handleSignUp}>
            <Title white={isSignIn}>Create Account</Title>
            {error && <div className="error-message">{error}</div>}
            <Input
              white={isSignIn}
              type="text"
              placeholder="Username"
              value={signupData.username}
              onChange={(e) =>
                setSignupData({ ...signupData, username: e.target.value })
              }
            />
            <Input
              white={isSignIn}
              type="password"
              placeholder="Password"
              value={signupData.password}
              onChange={(e) =>
                setSignupData({ ...signupData, password: e.target.value })
              }
            />
            <Select
              white={isSignIn}
              value={signupData.role}
              onChange={(e) =>
                setSignupData({ ...signupData, role: e.target.value })
              }
            >
              <option value="SHOPKEEPER">Shop keeper</option>
              <option value="ADMIN">Admin</option>
            </Select>
            <Button white={isSignIn} type="submit" disabled={loading}>
              Sign Up
            </Button>
          </Form>
        </SignUpContainer>

        {/* SignIn Container */}
        <SignInContainer signingIn={isSignIn}>
          <Form onSubmit={handleSignIn}>
            <Title white={!isSignIn}>Sign In</Title>
            {error && <div className="error-message">{error}</div>}
            <Input
              white={!isSignIn}
              type="text"
              placeholder="Username"
              value={loginData.username}
              onChange={(e) =>
                setLoginData({ ...loginData, username: e.target.value })
              }
            />
            <Input
              white={!isSignIn}
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
            <Select
              white={!isSignIn}
              value={loginData.role}
              onChange={(e) =>
                setLoginData({ ...loginData, role: e.target.value })
              }
            >
              <option value="SHOPKEEPER">Shop keeper</option>
              <option value="ADMIN">Admin</option>
            </Select>
            <Button white={!isSignIn} type="submit" disabled={loading}>
              Sign In
            </Button>
          </Form>
        </SignInContainer>

        {/* Overlay for switching between SignIn and SignUp */}
        <OverlayContainer signingIn={isSignIn}>
          <Overlay signingIn={isSignIn}>
            <LeftOverlayPanel signingIn={isSignIn}>
              <Title white>Welcome Back!</Title>
              <OverlayText>Please login with your personal info</OverlayText>
              <GhostButton onClick={() => setIsSignIn(true)}>
                Sign In
              </GhostButton>
            </LeftOverlayPanel>

            <RightOverlayPanel signingIn={isSignIn}>
              <Title white>Hello, Friend!</Title>
              <OverlayText>
                Enter your details and start your journey with us
              </OverlayText>
              <GhostButton onClick={() => setIsSignIn(false)}>
                Sign Up
              </GhostButton>
            </RightOverlayPanel>
          </Overlay>
        </OverlayContainer>
      </MainContainer>
    </Container>
  );
};

export default Login;
