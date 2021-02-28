import React from "react";
import styled from "styled-components";

interface Props {
  bgColor?: "white" | "cyan" | "mix-blue";
  color?: "white" | "black";
  className?: string;
  style?: React.CSSProperties | undefined;
  onClick?:
    | ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined;
}

export const Card: React.FC<Props> = ({
  children,
  bgColor = "white",
  color = "black",
  className,
  style,
  onClick,
}) => {
  return (
    <StyledCard
      style={style}
      bgColor={bgColor}
      color={color}
      className={className}
      onClick={onClick}
    >
      {children}
    </StyledCard>
  );
};

const StyledCard = styled.div<Props>`
  background: ${props =>
    props.bgColor === "mix-blue"
      ? "linear-gradient(var(--darkBlue), var(--lightBlue))"
      : `var(--${props.bgColor})`};
  padding: 20px;
  color: ${props =>
    props.color === "white" ? `var(--white)` : `var(--black)`};
`;
