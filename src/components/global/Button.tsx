import React from "react";
import styled from "styled-components";
import { AiOutlineGooglePlus } from "react-icons/ai";

interface ButtonProps {
  className?: string;
  style?: React.CSSProperties | undefined;
  text?: string;
  disabled?: boolean;
  type?: "submit" | "button" | "button-oauth";
  background?: "primary" | "secondary";
  onClick?:
    | (((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) &
        ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void))
    | undefined;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  style,
  text,
  disabled,
  type = "button",
  background,
  onClick,
}) => {
  const NormalButton = (
    <StyledButton
      background={background}
      className={className}
      style={style}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </StyledButton>
  );
  const OAuthButton = (
    <StyledButtonOAuth onClick={onClick} className={className} style={style}>
      <AiOutlineGooglePlus style={{ fontSize: 20, marginRight: 10 }} />
      {text}
    </StyledButtonOAuth>
  );

  return type === "button" ? NormalButton : OAuthButton;
};

const StyledButton = styled.button<ButtonProps>`
  padding: 14px 1.5rem;
  background: ${props =>
    props.disabled
      ? "gray"
      : props.background === "primary"
      ? "var(--blueButton)"
      : "var(--lightBlue)"};
  border: none;
  outline: none;
  color: white;
`;
const StyledButtonOAuth = styled.button`
  padding: 14px 1rem;
  background: var(--red);
  color: white;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;
