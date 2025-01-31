import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
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
import { authService } from "../../services/api";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
    role: "SHOPKEEPER",
  });
  const [signupData, setSignupData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, signup } = useAuth();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      const user = await login(loginData);
      navigate(
        user.role === "ADMIN" ? "/admin/dashboard" : "/shopkeeper/dashboard"
      );
    } catch (err) {
      setError("Failed to sign in");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await authService.signup({
        username: signupData.username,
        password: signupData.password,
        role: "SHOPKEEPER",
      });
      setIsSignIn(true);
      setSignupData({ username: "", password: "" });
    } catch (err) {
      setError("Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <MainContainer>
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
            <Button white={isSignIn} type="submit" disabled={loading}>
              Sign Up
            </Button>
          </Form>
        </SignUpContainer>

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
              <option value="SHOPKEEPER">Shopkeeper</option>
              <option value="ADMIN">Admin</option>
            </Select>
            <Button white={!isSignIn} type="submit" disabled={loading}>
              Sign In
            </Button>
          </Form>
        </SignInContainer>

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
                Enter your details and start journey with us
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
