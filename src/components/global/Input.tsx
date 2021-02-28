import React from "react";

import styled from "styled-components";

interface SelecProps {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  values: string[];
  value: string;
}

export const SelectInput: React.FC<SelecProps> = ({
  onChange,
  values,
  value,
}) => {
  return (
    <StyledSelect onChange={onChange} value={value}>
      {values.map(value => {
        return (
          <React.Fragment key={value}>
            <option value={value}>{value}</option>
          </React.Fragment>
        );
      })}
    </StyledSelect>
  );
};

const StyledSelect = styled.select`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
`;

interface PropsTextField {
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  value: string;
  className?: string;
  style?: React.CSSProperties | undefined;
  type: "text" | "password";
  placeholder?: string;
}

export const TextField: React.FC<PropsTextField> = ({
  onChange,
  value,
  className,
  style,
  type,
  placeholder,
}) => {
  return (
    <StyledTextField
      onChange={onChange}
      value={value}
      className={className}
      style={style}
      type={type}
      placeholder={placeholder}
    />
  );
};

const StyledTextField = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
`;
