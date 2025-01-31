import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  padding: 20px;
  background: #ffffff;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
`;

export const MainContainer = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 768px;
  min-height: 580px;
`;

export const SignUpContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  background-color: ${props => props.signingIn ? '#292929' : '#ffffff'};
  ${props => props.signingIn !== true ? `
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
  ` : null}
`;

export const SignInContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  background-color: ${props => props.signingIn ? '#ffffff' : '#292929'};
  ${props => (props.signingIn !== true ? `transform: translateX(100%);` : null)}
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
  background-color: inherit;
`;

export const Title = styled.h1`
  font-weight: 500;
  margin: 0;
  margin-bottom: 1.5rem;
  color: ${props => props.white ? '#ffffff' : '#292929'};
`;

export const Input = styled.input`
  background-color: ${props => props.white ? '#2d2d2d' : '#f5f5f5'};
  border: 1px solid ${props => props.white ? '#404040' : '#e0e0e0'};
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  border-radius: 8px;
  font-size: 0.9rem;
  color: ${props => props.white ? '#ffffff' : '#292929'};
  transition: all 0.3s ease;

  &::placeholder {
    color: ${props => props.white ? '#888888' : '#666666'};
  }

  &:focus {
    outline: none;
    border-color: ${props => props.white ? '#666666' : '#292929'};
    box-shadow: 0 0 0 2px ${props => props.white ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  }
`;

export const Button = styled.button`
  border-radius: 8px;
  border: none;
  background-color: ${props => props.white ? '#ffffff' : '#292929'};
  color: ${props => props.white ? '#292929' : '#ffffff'};
  font-size: 0.9rem;
  font-weight: 500;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: all 0.3s ease;
  margin-top: 1rem;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.white ? '#f5f5f5' : '#333333'};
    transform: translateY(-1px);
  }
`;

export const GhostButton = styled(Button)`
  background-color: transparent;
  border: 2px solid #ffffff;
  color: #ffffff;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-1px);
  }
`;

export const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  ${props => props.signingIn !== true ? `transform: translateX(-100%);` : null}
`;

export const Overlay = styled.div`
  background: #292929;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  ${props => props.signingIn !== true ? `transform: translateX(50%);` : null}
`;

export const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

export const LeftOverlayPanel = styled(OverlayPanel)`
  transform: translateX(-20%);
  ${props => props.signingIn !== true ? `transform: translateX(0);` : null}
`;

export const RightOverlayPanel = styled(OverlayPanel)`
  right: 0;
  transform: translateX(0);
  ${props => props.signingIn !== true ? `transform: translateX(20%);` : null}
`;

export const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
  color: ${props => props.white ? '#ffffff' : '#666666'};
`;

export const Select = styled.select`
  background-color: ${props => props.white ? '#2d2d2d' : '#f5f5f5'};
  border: 1px solid ${props => props.white ? '#404040' : '#e0e0e0'};
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  border-radius: 8px;
  font-size: 0.9rem;
  color: ${props => props.white ? '#ffffff' : '#292929'};
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.white ? '#666666' : '#292929'};
    box-shadow: 0 0 0 2px ${props => props.white ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  }

  option {
    color: #292929;
    background: #ffffff;
    padding: 8px;
  }
`;

export const OverlayText = styled.p`
  color: #ffffff;
  font-size: 14px;
  margin: 20px 0;
  letter-spacing: 0.5px;
  line-height: 20px;
`;
